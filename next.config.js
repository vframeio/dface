const path = require("path");

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};
