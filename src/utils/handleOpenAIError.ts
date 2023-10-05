import OpenAI from 'openai';
import * as vscode from 'vscode';
import { commands, window } from 'vscode';

const handleOpenAIError = (error: any) => {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 400)
      return window.showErrorMessage('OpenAI - Bad request.');
    if (error.status === 401)
      return window
        .showErrorMessage('OpenAI - Bad API key',
          'Open Settings',
          'Open AI Account'
        ).then((selection) => {
          if (selection === 'Open Settings')
            commands.executeCommand('workbench.action.openSettings',
              'commit-ai api key');
          if (selection === 'Open AI Account')
            commands.executeCommand('vscode.open',vscode.Uri
              .parse('https://platform.openai.com/account/api-keys'));
        });
    if (error.status === 403)
      return window.showErrorMessage('OpenAI - Permission denied.');
    if (error.status === 404)
      return window.showErrorMessage('OpenAI - Not found.');
    if (error.status === 422)
      return window.showErrorMessage('OpenAI - Unprocessable entity.');
    if (error.status === 429)
      return window.showErrorMessage('OpenAI - Too many requests.');
    if (error.status === 500)
      return window.showErrorMessage('OpenAI - Internal server error.');
    return window.showErrorMessage(`OpenAI - ${error.name}`);
  }
  throw error;
};

export default handleOpenAIError;
