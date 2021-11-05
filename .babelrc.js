module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
    ],
  ],
  plugins: [
    ["@emotion/babel-plugin"],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {},
      },
    ],
  ],
};
