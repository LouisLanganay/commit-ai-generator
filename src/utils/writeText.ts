import * as vscode from 'vscode';

const writeInputBox = (text: string | null | undefined, repository: any) => {
  repository.inputBox.value += text;
};

const writeTextEditor = (
  text: string | null | undefined, activeTextEditor: any
) => {
  activeTextEditor.edit((editBuilder: any) => {
    editBuilder.insert(activeTextEditor.selection.active, text);
  });
};

const writeText = (text: string | null | undefined, repository: any) => {
  if (!text) return;

  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor)
    return writeInputBox(text, repository);

  const filePath = activeTextEditor.document.fileName;
  const pathSegments = filePath.split(/[\\/]/);
  const fileName = pathSegments[pathSegments.length - 1];

  if (fileName === 'COMMIT_EDITMSG')
    return writeTextEditor(text, activeTextEditor);

  writeInputBox(text, repository);
};

export default writeText;
