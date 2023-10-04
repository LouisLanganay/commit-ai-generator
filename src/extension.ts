import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.info('Congratulations, your extension "commit-ai" is now active!');

	let disposable = vscode.commands
		.registerCommand('commit-ai.helloWorld',() => {
			vscode.window.showInformationMessage('Hello World from commit ai!');
		});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
