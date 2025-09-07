module.exports = {
  arrowParens: 'avoid', // Omit parens when possible: x => x
  singleQuote: true, // Use single quotes instead of double
  trailingComma: 'all', // Add trailing commas where valid (better diffs)
  semi: true, // Always add semicolons
  tabWidth: 2, // 2 spaces per indentation (React Native standard)
  useTabs: false, // Use spaces, not tabs
  bracketSpacing: true, // Add spaces inside object braces: { foo: bar }
  jsxSingleQuote: false, // Use double quotes in JSX: <Text> not <Text>
  jsxBracketSameLine: false, // Keep closing bracket on its own line
  printWidth: 80, // Wrap lines that exceed 80 chars
  proseWrap: 'always', // Wrap markdown text automatically
  endOfLine: 'auto', // Maintain existing line endings (cross-platform)
};
