module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/prop-types": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "intensity",
          "skyColor",
          "groundColor",
          "material",
          "geometry",
          "position",
          "object",
          "rotation",
          "dispose",
          "skeleton",
          "morphTargetDictionary",
          "morphTargetInfluences",
        ], // Add custom properties here
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
