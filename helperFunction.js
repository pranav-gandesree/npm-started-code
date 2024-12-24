import fs from 'fs';
import chalk from 'chalk';
import shell from 'shelljs';

export const installTailwind = () => {
  console.log(chalk.green('Installing TailwindCSS...'));
  shell.exec('npm install -D tailwindcss postcss autoprefixer');
  shell.exec('npx tailwindcss init -p');

  // replace Tailwind config file
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


export const installPrisma = () => {
  console.log(chalk.green('Installing Prisma...'));
  shell.exec('npm install prisma && npx prisma init');
  fs.writeFileSync('./prisma/prisma.ts', prismaTs);

};


export const installShadcn = () => {
  console.log(chalk.green('Installing Shadcn...'));
  shell.exec('npm i react@18 react-dom@18');
  shell.exec('npx shadcn@latest init -d');
  shell.exec('npx shadcn@latest add button input');
};
