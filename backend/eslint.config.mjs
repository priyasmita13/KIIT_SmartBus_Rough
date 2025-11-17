export default [
	{
		files: ["**/*.ts"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			parser: require.resolve("@typescript-eslint/parser"),
			parserOptions: { project: false },
		},
		plugins: {
			"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
		},
		rules: {
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-console": "off",
		},
	},
];

