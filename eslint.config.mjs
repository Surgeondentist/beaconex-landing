/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "legacy/**"],
  },
];

export default eslintConfig;
