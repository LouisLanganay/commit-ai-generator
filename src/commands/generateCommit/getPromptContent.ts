import * as vscode from 'vscode';
import {
  window
} from 'vscode';
import {
  basicPrompt,
  karmaPrompt,
  dottedPrompt,
  emojiPrompt
} from '../';
import {
  getError
} from '../../utils';

async function getPromptContent(
  commitNorm: string,
  gitDiffChanges: string,
  config: vscode.WorkspaceConfiguration
) {
  let content = null;
  const customPrompt: string | undefined = config
    .get('commit-ai.prompt.customPrompt');

  if (commitNorm === 'Basic')
    content = basicPrompt;
  if (commitNorm === 'Karma')
    content = karmaPrompt;
  if (commitNorm === 'Dotted')
    content = dottedPrompt;
  if (commitNorm === 'Emoji')
    content = emojiPrompt;
  if (customPrompt?.length)
    if (customPrompt.length > 0)
      content = customPrompt;

  if (!content) {
    window.showErrorMessage(getError().no_prompt);
    return null;
  }
  content += 'Changes: ' + gitDiffChanges;
  return content;
};

export default getPromptContent;
