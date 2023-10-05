const dottedPrompt: string =
'Create a commit message. \
Format of the commit message: <type>(<scope>): <subject> <BLANK LINE> <body> \
The first line cannot be longer than 72 characters and should be followed by a \
blank line. The type and scope should always be lowercase as shown below. \
Allowed <type> values: feat, fix, docs, refactor, style, test, build. \
Example <scope> values: init, runner, watcher, config, web-server, \
proxy, etc. The <scope> can be empty (e.g. if the change is a global or difficult \
to assign to a single component), in which case the parentheses are omitted. In \
smaller projects, the <scope> is empty. Just as in the \
<subject>, use the imperative, present tense: "change" not "changed" nor \
"changes". Message body should include motivation for the change and contrasts \
with previous behavior and changes are listed with a bullet points. The bullet \
points should describe the changes in more detail but not longer than needed.';

export default dottedPrompt;
