/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: true,
  bracketSameLine: true,
  jsxSingleQuote: true,
};

module.exports = config;
