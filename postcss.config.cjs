module.exports = {
  plugins: {
    // Certifique-se de que o postcss-preset-env esteja declarado antes do tailwindcss
    "postcss-preset-env": {
      stage: 0,
      features: {
        "nesting-rules": true,
        "custom-properties": {
          preserve: false,
        },
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
