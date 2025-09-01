import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import markdown from '@eslint/markdown';
import css from '@eslint/css';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // React/JSX configuration
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Optional: disable if not using PropTypes
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Markdown configuration
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    language: 'markdown/gfm',
    rules: {
      ...markdown.configs.recommended.rules,
    },
  },

  // CSS configuration
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];
