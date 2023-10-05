const basicPrompt: string =
'Create a commit message. \
Format of the commit message: <type>: <title>\
The first line cannot be longer than 50 characters. \
The type and scope should always be lowercase as shown below. \n\n \
Allowed <type> values: feat for a new feature for the user, not a new feature \
for build script. Such commit will trigger a release bumping a MINOR version. \
fix for a bug fix for the user, not a fix to a build script. Such commit will \
trigger a release bumping a PATCH version. perf for performance improvements. \
Such commit will trigger a release bumping a PATCH version. docs for changes \
to the documentation. style for formatting changes, missing semicolons, etc. \
refactor for refactoring production code, e.g. renaming a variable. test for \
adding missing tests, refactoring tests; no production code change. build for \
updating build configuration, development tools or other changes irrelevant \
to the user.';

export default basicPrompt;
