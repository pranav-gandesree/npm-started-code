# quickstart-project

`quickstart-project` is a simple CLI tool designed to help developers quickly set up the basic configurations for frontend and backend projects. It streamlines the initial setup process, saving time and effort by automating repetitive tasks.

## Features
- Sets up a basic **frontend** configuration.
    - Using React.JS
    - Using Next.js
- Sets up a basic **backend** configuration.
    - Using ExpressJs and Node.js and MongoDB.

## Installation
To install `quickstart-project`, use the following command:

```bash
npm install -g quickstart-project
```

## Usage
Once installed, you can run the CLI tool using the following command:

```bash
quickstart-project
```

Follow the prompts to set up your project.

## File Structure
`npm-starter` creates the following structure in your project directory:

```
project-directory/
├── frontend/        # Frontend setup
├── backend/         # Backend setup

```

## Dependencies
The tool uses the following dependencies:
- **[chalk](https://www.npmjs.com/package/chalk)**: For colorful console messages.
- **[inquirer](https://www.npmjs.com/package/inquirer)**: To prompt user inputs.
- **[shelljs](https://www.npmjs.com/package/shelljs)**: For running shell commands.

## Development
To contribute to this project, clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/npm-starter.git
cd quickstart-project
npm install
```

Test the CLI locally:

```bash
npm link
project-setup
```

## License
This project is licensed under the [MIT License](LICENSE).

## Author
Created by **pranav gandesree**. Contributions are welcome!
