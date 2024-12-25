#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';
import { frontendSetup } from './frontendSetup.js';
import { backendSetup } from './backendSetup.js';

const setupProject = async () => {
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
        'React + TypeScript + Tailwind',
        'React + TypeScript + Tailwind + Express + Mongoose',
      ],
    },
  ]);

  console.log(chalk.green(`Setting up project: ${projectName}...`));

  shell.mkdir(projectName);
  shell.cd(projectName);

  if (frontendChoice !== 'Skip Frontend') {
    console.log(chalk.green(`Setting up ${frontendChoice}...`));
    await frontendSetup(frontendChoice);
  }

  if (frontendChoice.includes('Express') && frontendChoice.includes('Mongoose')) {
    console.log(chalk.blue('Switching to the project root folder for backend setup...'));
    process.chdir('../'); 
    await backendSetup();
  }

  console.log(chalk.green('Project setup complete!'));
};

setupProject()
  .then(() => {
    console.log(chalk.green('Setup completed successfully!'));
    process.exit(0);
  })
  .catch((err) => {
    console.error(chalk.red('An error occurred during setup:'), err);
    process.exit(1);
  });
