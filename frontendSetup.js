import fs from 'fs';
import chalk from 'chalk';
import shell from 'shelljs';
import { installPrisma, installTailwind, installShadcn } from './helperFunction.js';

export const frontendSetup = async (frontendChoice) => {
  if (frontendChoice.startsWith('Next.js')) {
    setupNextJs();
    installShadcn();

    if (frontendChoice.includes('Prisma')) {
      installPrisma();
    }
  } else if (frontendChoice.startsWith('React')) {
    setupReactTypeScript();
    installTailwind();
  }
};



const PageTsxContent = `
export default function Home() {
  return (
    <div className="text-blue-500">hellow world!!</div>
  )
}
`
const setupNextJs = () => {
  console.log(chalk.green('Setting up Next.js project...'));
  shell.exec(
    `npx create-next-app@latest . --typescript --eslint --tailwind --no-turbopack --src-dir --app --no-turbo --import-alias "@/*"`,
    { stdio: 'inherit' }
  );
 fs.writeFileSync('./src/app/page.tsx', PageTsxContent);
};


const setupReactTypeScript = () => {
  console.log(chalk.green('Setting up React + TypeScript project...'));
  shell.exec('npx create-vite frontend --template react-ts', { stdio: 'inherit' });
  shell.cd('frontend');

  const AppContent = `
const App = () => {
  return (
    <div className="bg-blue-500">
      hello world
    </div>
  )
}
export default App;`;
  fs.writeFileSync('./src/App.tsx', AppContent);
};


