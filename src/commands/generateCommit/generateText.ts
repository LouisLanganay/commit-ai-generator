import * as vscode from 'vscode';
import {
  window
} from 'vscode';
import {
  getError,
  handleOpenAIError,
  writeText
} from '../../utils';
import OpenAI from 'openai';
import getPromptContent from './getPromptContent';

let isRunning = false;

async function createCompletion(
  openai: any,
  config: vscode.WorkspaceConfiguration,
  content: string
){
  const openAiMaxToken = config.get('commit-ai.prompt.openAiMaxToken');
  const openAiModel = config.get('commit-ai.prompt.openAiModel');
  const openAiTemperature = config.get('commit-ai.prompt.openAiTemperature');

  return openai.chat.completions.create({
    max_tokens: openAiMaxToken as number,
    messages: [
      {
        role: 'user',
        content: content as string
      }
    ],
    model: openAiModel as string,
    temperature: openAiTemperature as number,
    stream: true
  });
}

async function generateText(
  config: vscode.WorkspaceConfiguration,
  gitDiffChanges: string,
  repository: any,
  progress: vscode.Progress<{ message?: string; increment?: number }>,
  token: vscode.CancellationToken
) {
  if (isRunning)
    return window.showWarningMessage(getError().already_running);
  isRunning = true;
  repository.inputBox.value = '';

  const openAiApiKey = config.get('commit-ai.openAiApiKey');
  const commitNorm = config.get('commit-ai.commitNorm');
  const openai = new OpenAI({
    apiKey: openAiApiKey as string
  });

  const content = await getPromptContent
  (commitNorm as string,
    gitDiffChanges,
    config
  );
  if (!content)
    return isRunning = false;

  try {
    const stream = await createCompletion(openai, config, content);

    let number = 0;
    for await (const part of stream) {
      if (token.isCancellationRequested) {
        isRunning = false;
        stream.controller.abort();
        return;
      }
      const commitMessage = part.choices[0]?.delta?.content || '';
      writeText(commitMessage, repository);
      if (number < 85 ) {
        progress.report({ increment: 1 });
        number++;
      }
    }
    isRunning = false;
    progress.report({ increment: 100 });
  } catch (err) {
    handleOpenAIError(err);
    isRunning = false;
  }
};

export default generateText;
