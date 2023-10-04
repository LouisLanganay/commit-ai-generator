import OpenAI from 'openai';
import * as vscode from 'vscode';

const handleOpenAIError = (error: typeof OpenAI.APIError) => {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 400)
      return vscode.window.showErrorMessage('OpenAI - Bad request.');
    if (error.status === 401)
      return vscode.window.showErrorMessage('OpenAI - API Key is invalid.');
    if (error.status === 403)
      return vscode.window.showErrorMessage('OpenAI - Permission denied.');
    if (error.status === 404)
      return vscode.window.showErrorMessage('OpenAI - Not found.');
    if (error.status === 422)
      return vscode.window.showErrorMessage('OpenAI - Unprocessable entity.');
    if (error.status === 429)
      return vscode.window.showErrorMessage('OpenAI - Too many requests.');
    if (error.status === 500)
      return vscode.window.showErrorMessage('OpenAI - Internal server error.');
    return vscode.window.showErrorMessage(`OpenAI - ${error.name}`);
  }
  throw error;
};

export default handleOpenAIError;
