const karmaPrompt: string =
'Create a commit message. \
Format of the commit message: <type>(<scope>): <subject> <BLANK LINE> <body> \
The first line cannot be longer than 72 characters and should be followed by a \
blank line. The type and scope should always be lowercase as shown below. \
Allowed <type> values: feat for a new feature for the user, not a new feature \
for build script. Such commit will trigger a release bumping a MINOR version. \
fix for a bug fix for the user, not a fix to a build script. Such commit will \
trigger a release bumping a PATCH version. perf for performance improvements. \
Such commit will trigger a release bumping a PATCH version. docs for changes \
to the documentation. style for formatting changes, missing semicolons, etc. \
refactor for refactoring production code, e.g. renaming a variable. test for \
adding missing tests, refactoring tests; no production code change. build for \
updating build configuration, development tools or other changes irrelevant \
to the user. Example <scope> values:init, runner, watcher, config, web-server, \
proxy, etc. The <scope> can be empty (e.g. if the change is a global or difficult \
to assign to a single component), in which case the parentheses are omitted. In \
smaller projects such as Karma plugins, the <scope> is empty. Just as in the \
<subject>, use the imperative, present tense: "change" not "changed" nor \
"changes". Message body should include motivation for the change and contrasts \
with previous behavior.';

export default karmaPrompt;
