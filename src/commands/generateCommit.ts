import * as vscode from 'vscode';
import OpenAI from 'openai';
import { writeText } from '../utils';
import handleOpenAIError from '../utils/handleOpenAIError';

async function notApiKey() {
  const config = vscode.workspace.getConfiguration();
  const errorMessage = 'OpenAI API Key is not set. Please set it in the settings.';

  vscode.window
    .showWarningMessage(errorMessage, 'Open Settings')
    .then((selection) => {
      if (selection === 'Open Settings')
        vscode.commands
          .executeCommand('workbench.action.openSettings', 'commit-ai');
    });

  const newApiKey = await vscode.window.showInputBox({
    title: 'OpenAI API Key',
    placeHolder: 'sk-....',
    prompt: 'Enter your OpenAI API key',
    ignoreFocusOut: true
  });

  if (newApiKey) {
    config.update(
      'commit-ai.openAiApiKey',
      newApiKey,
      vscode.ConfigurationTarget.Global
    );
    vscode.window.showInformationMessage('OpenAI API Key set successfully.');
  }
  return;
}

const generateCommit = async () => {
  const config = vscode.workspace.getConfiguration();
  const openAiApiKey = config.get('commit-ai.openAiApiKey');
  const openAiMaxToken = config.get('commit-ai.openAiMaxToken');

  if (!openAiApiKey)
    return notApiKey();

  const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
  if (!gitExtension)
    throw new Error('Git extension is not available.');
  const repository = gitExtension.getAPI(1).repositories[0];

  const openai = new OpenAI({
    apiKey: openAiApiKey as string
  });

  const gitDiffChanges = await repository.diff(true);
  if (!gitDiffChanges)
    return vscode.window.showWarningMessage('No changes to commit.');

  await openai.chat.completions.create({
    max_tokens: openAiMaxToken as number,
    messages: [
      {
        role: 'user',
        content: 'The following changes are tracked by git. Create a short Title \
        of a maximum of 50 characters with words like feat, fix, perf, docs, \
        style, refactor, test or build. The body should be a short description \
        of the changes. \
        Changes: ' + gitDiffChanges
      }
    ],
    model: 'gpt-3.5-turbo'
  }).catch((err) => {
    handleOpenAIError(err);
  }).then((response) => {
    console.info(response);
    writeText(response?.choices[0].message.content, repository);
  });
};

export default generateCommit;

