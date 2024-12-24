#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import shell from 'shelljs';

const installTailwind = () => {
  console.log(chalk.green('Installing TailwindCSS...'));
  shell.exec('npm install -D tailwindcss postcss autoprefixer');
  shell.exec('npx tailwindcss init -p');

  // Replace Tailwind config file
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }`;
  fs.writeFileSync('./tailwind.config.js', tailwindConfigContent);

  // Replace index.css file for Tailwind
  const indexCssContent = `@tailwind base;
 @tailwind components;
 @tailwind utilities;`;
  fs.writeFileSync('./src/index.css', indexCssContent);
};


const prismaTs = `
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
`


const installPrisma = () => {
  console.log(chalk.green('Installing Prisma...'));
  shell.exec('npm install prisma && npx prisma init');
  fs.writeFileSync('./prisma/prisma.ts', prismaTs);

};

const setupNextJs = () => {
  console.log(chalk.green('Setting up Next.js project...'));
  shell.exec(
    `npx create-next-app@latest . --typescript --eslint --tailwind --no-turbopack --src-dir --app --no-turbo --import-alias "@/*"`,
    { stdio: 'inherit' }
  );
  // shell.cd('frontend');
};

const setupReactTypeScript = () => {
  console.log(chalk.green('Setting up React + TypeScript project...'));
  shell.exec(
    `npx create-vite frontend --template react-ts`,
    { stdio: 'inherit' }
  );
  shell.cd('frontend');

  const AppContent = `
const App = () => {
  return (
    <div className="bg-blue-500">
      hello world
    </div>
  )
}
export default App;`
fs.writeFileSync('./src/App.tsx', AppContent);
};

const installShadcn = () => {
  console.log(chalk.green('Installing Shadcn...'));
  shell.exec('npm i react@18 react-dom@18');
  shell.exec('npx shadcn@latest init -d');
  shell.exec('npx shadcn@latest add button input');
};

const setupBackend = () => {
  console.log(chalk.green('Setting up backend...'));
  shell.mkdir('backend');
  shell.cd('backend');


  console.log(chalk.green('Installing backend dependencies...'));
  shell.exec('npm init -y');
  shell.exec('npm install express mongoose cors dotenv jsonwebtoken bcryptjs');
  shell.exec('npm install -D typescript @types/node @types/express ts-node @types/mongoose @types/bcryptjs @types/jsonwebtoken');

  const tsConfigContent = `{
  "compilerOptions": {
    "target": "es2016",
    "rootDir": "./src",
    "module": "esnext",
    "typeRoots": ["./node_modules/@types", "./src/types/index.d.ts"],
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts", "types/**/*.d.ts"],
  "exclude": ["node_modules"]
}`;
  fs.writeFileSync('./tsconfig.json', tsConfigContent);

  const indexTsContent = `import express from 'express';
  import cors from 'cors';
  import mongoose from 'mongoose';

  dotenv.config();

  const app = express();
  const port = 5000;

  app.use(cors());
  app.use(express.json());

  mongoose.connect('mongodb://localhost:27017/mydb');

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(\`Server running at http://localhost:\${port}\`);
  });
  `;
  fs.writeFileSync('./src/index.ts', indexTsContent);

  shell.cd('..');
};

const setupProject = async () => {
  // Ask user for project name and choices
  const { projectName, frontendChoice } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      validate: (input) => (input ? true : 'Project name cannot be empty'),
    },
    {
      type: 'list',
      name: 'frontendChoice',
      message: 'Choose a setup:',
      choices: [
        'Next.js + Shadcn + Prisma',
        'Next.js + Shadcn',
        'React + TypeScript + Tailwind + Shadcn',
        'React + TypeScript + Tailwind + Shadcn + Express + Mongoose',
      ],
    }
  ]);

  console.log(chalk.green(`Setting up project: ${projectName}...`));

  // Create project folder and navigate into it
  shell.mkdir(projectName);
  shell.cd(projectName);

  // Frontend Setup
  if (frontendChoice !== 'Skip Frontend') {
    console.log(chalk.green(`Setting up ${frontendChoice}...`));

    if (frontendChoice.startsWith('Next.js')) {
      setupNextJs();
      installShadcn();

      if (frontendChoice.includes('Prisma')) {
        installPrisma();
      }
    } else if (frontendChoice.startsWith('React')) {
      setupReactTypeScript();
      installTailwind();
      installShadcn();
    }

    shell.cd('..'); // Navigate back to root directory
  }

  if (frontendChoice.includes('Express') && frontendChoice.includes('Mongoose')) {
    setupBackend();
  }

  console.log(chalk.green('Project setup complete!'));
};

setupProject()
  .then(() => {
    console.log(chalk.green('Setup completed successfully!'));
    process.exit(0); // Automatically exit the process
  })
  .catch((err) => {
    console.error(chalk.red('An error occurred during setup:'), err);
    process.exit(1); // Exit with error code
  });
