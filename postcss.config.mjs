/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {}, // Permite importar archivos CSS
    'postcss-custom-properties': {
      // Permite usar variables CSS
      preserve: true, // Esto permite mantener las variables originales
    },
    tailwindcss: {}, // Usa Tailwind CSS
    autoprefixer: {}, // Agrega prefijos de navegador
  },
};

export default config;
