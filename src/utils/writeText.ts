const writeText = (text: string | null | undefined, repository: any) => {
  if (!text) return;

  repository.inputBox.value = '';
  repository.inputBox.value = text;
};

export default writeText;
