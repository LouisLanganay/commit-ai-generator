import {
  window,
  workspace,
  ProgressLocation,
  extensions
} from 'vscode';
import {
  getError
} from '../../utils';
import notApiKey from './notApiKey';
import generateText from './generateText';

const generateCommit = async () => {
  const config = workspace.getConfiguration();
  const openAiApiKey = config.get('commit-ai.openAiApiKey');

  if (!openAiApiKey)
    return notApiKey();

  const gitExtension = extensions.getExtension('vscode.git')?.exports;
  if (!gitExtension)
    return window.showErrorMessage(getError().no_git);
  const repository = gitExtension.getAPI(1).repositories[0];

  window.withProgress({
    location: ProgressLocation.Notification,
    title: getError().running,
    cancellable: true
  }, async (progress, token) => {
    progress.report({ increment: 0 });
    token.onCancellationRequested(() => {
      window.showInformationMessage(getError().cancelled);
    });

    const gitDiffChanges = await repository.diff(true);
    if (!gitDiffChanges) {
      window.showWarningMessage(getError().no_changes);
      return;
    }
    progress.report({ increment: 10 });

    await generateText(
      config,
      gitDiffChanges,
      repository,
      progress,
      token
    );
  });
};

export default generateCommit;

