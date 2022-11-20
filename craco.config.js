const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // "@primary-color": "#b2b0c7",
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
