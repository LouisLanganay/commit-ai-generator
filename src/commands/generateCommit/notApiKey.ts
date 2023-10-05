import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import { getError, showInputBox } from '../../utils';

async function notApiKey() {
  const config = workspace.getConfiguration();

  window
    .showWarningMessage(getError().no_api_key, 'Open Settings', 'Open AI Account')
    .then((selection) => {
      if (selection === 'Open Settings')
        commands.executeCommand('workbench.action.openSettings',
          'commit-ai api key');
      if (selection === 'Open AI Account')
        commands.executeCommand('vscode.open',vscode.Uri
          .parse('https://platform.openai.com/account/api-keys'));
    });
  const newApiKey = await showInputBox(
    'OpenAI API Key',
    'sk-....',
    'Enter your OpenAI API key',
    true
  );

  if (newApiKey) {
    config.update(
      'commit-ai.openAiApiKey',
      newApiKey,
      vscode.ConfigurationTarget.Global
    );
    window.showInformationMessage(getError().api_key_set);
  }
  return;
};

export default notApiKey;
