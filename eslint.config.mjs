// eslint.config.mjs
export default [
  {
    languageOptions: {
      globals: {
        // Definir variables globales específicas
        process: 'readonly',
        __dirname: 'readonly',
        // Agrega otras variables según sea necesario
      },
    },
    // Otras configuraciones...
  },
];
