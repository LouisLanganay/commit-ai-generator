const emojiPrompt: string =
'Create a commit message. \
Format of the commit message: <type>: <subject>\
The first line cannot be longer than 72 characters and should be followed by a \
blank line. The type and scope should always be lowercase as shown below. \
Allowed <type> values: ["🆕 FEAT", "🐞 FIX", "📄 DOCS", "🏗️ REFACTOR", "💅 STYLE", \
"🚧 TEST", "🔨 BUILD"]. \
In the <subject>, use the imperative, present tense: "change" not "changed" nor \
"changes". Message body should include motivation for the change and contrasts \
with previous behavior and changes are listed with a bullet points. The bullet \
points should describe the changes in more detail but not longer than needed.';

export default emojiPrompt;
