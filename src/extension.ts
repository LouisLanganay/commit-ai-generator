import * as vscode from 'vscode';
import commandListener from './commandListener';

export function activate(context: vscode.ExtensionContext) {
  commandListener(context);
}

export function deactivate() {}
