import fs from 'fs';
import chalk from 'chalk';
import shell from 'shelljs';

export const backendSetup = async () => {
  console.log(chalk.green('Setting up backend...'));
  shell.mkdir('backend');
  shell.cd('backend');

  shell.mkdir('src');

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
