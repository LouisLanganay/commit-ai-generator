import * as vscode from 'vscode';
import {
  generateCommit
} from './commands/index';

const commands = [
  {
    name: 'commit-ai.generateCommit',
    callback: generateCommit
  }
];

interface Command {
  name: string;
  callback: () => any;
}

const commandListener = (context: vscode.ExtensionContext) => {
  commands.forEach((command: Command) => {
    const { name, callback } = command;

    context.subscriptions.push(
      vscode.commands.registerCommand(name, callback)
    );
  });
};

export default commandListener;
