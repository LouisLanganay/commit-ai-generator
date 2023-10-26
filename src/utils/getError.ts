/* eslint-disable max-len */
const getError = () => ({
  no_prompt: 'Commit norm not found or no custom prompt set.',
  no_api_key: 'OpenAI API Key is not set. Please set it in the settings.',
  api_key_set: 'OpenAI API Key set successfully.',
  already_running: 'Commit AI is already running. Please wait until it is finished.',
  no_git: 'Git extension not found. Please install it and try again.',
  running: 'Generating commit message...',
  no_changes: 'No changes to commit.',
  cancelled: 'Commit generation cancelled.'
});

export default getError;
