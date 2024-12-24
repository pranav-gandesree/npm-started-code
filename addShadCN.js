
export const installShadcnForReact = () => {
    console.log(chalk.green('Installing Shadcn...'));
    shell.exec('npm i react@18 react-dom@18');
  //   shell.exec('npx shadcn@latest init -d');
  shell.exec('npx shadcn@latest init -d --Install --ComponentsJson');
  //   updateTsconfigForReact();
    shell.exec('npx shadcn@latest add button input');
  };
  
  
  
  const updateTsconfigForReact = () => {
  
      console.log(chalk.green('Updating tsconfig.json for React...'));
      const tsconfigPath = 'tsconfig.json';
    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};
      tsconfig.compilerOptions.baseUrl = '.';
      tsconfig.compilerOptions.paths = {
        ...(tsconfig.compilerOptions.paths || {}),
        '@/*': ['src/*'],
        '@/components/*': ['src/components/*'],
        '@/lib/*': ['src/lib/*'],
      };
  
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log(chalk.green('Updated tsconfig.json with import alias.'));
    } catch (err) {
      console.error(chalk.red('Error updating tsconfig.json for import alias:'), err);
    }
  
    // Create components.json if not exists
    const componentsJsonPath = 'components.json';
    if (!fs.existsSync(componentsJsonPath)) {
      const defaultComponents = {
        components: []
      };
  
      try {
        fs.writeFileSync(componentsJsonPath, JSON.stringify(defaultComponents, null, 2));
        console.log(chalk.green('Created components.json.'));
      } catch (err) {
        console.error(chalk.red('Error creating components.json:'), err);
      }
    }
  }