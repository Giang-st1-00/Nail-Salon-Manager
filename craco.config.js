const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ff006e",
              "@border-radius-base": "2px",
              "@text-color": "#666",
              "@font-size-base": "13px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
