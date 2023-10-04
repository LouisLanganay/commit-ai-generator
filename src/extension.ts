import * as vscode from 'vscode';
import commandListener from './commandListener';

export function activate(context: vscode.ExtensionContext) {
  console.info('Congratulations, your extension "commit-ai" is now active!');

  commandListener(context);
}

export function deactivate() {}
