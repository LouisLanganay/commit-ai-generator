import * as vscode from 'vscode';

const showInputBox = async (
  title: string,
  placeHolder: string,
  prompt: string,
  ignoreFocusOut: boolean
) => {
  return await vscode.window.showInputBox({
    title,
    placeHolder,
    prompt,
    ignoreFocusOut
  });
};

export default showInputBox;
