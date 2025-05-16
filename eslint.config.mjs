// eslint.config.mjs
export default [
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        // Agrega otras variables según sea necesario
      },
    },
    rules: {
      // Reglas para manejo de espacios en blanco
      'no-trailing-spaces': 'off',  // Permitir espacios al final de la línea
      'no-multiple-empty-lines': 'off',  // Permitir múltiples líneas vacías

      // Reglas sobre comillas
      'quotes': ['error', 'double'],  // Utilizar comillas dobles (puedes cambiar a 'single' si prefieres comillas simples)

      // Reglas de indentación
      'indent': ['error', 2],  // Utilizar 2 espacios para la indentación

      // Reglas para var, let y const
      'no-var': 'error',  // Reemplazar `var` con `let` o `const`
      'prefer-const': 'error',  // Usar `const` cuando la variable no se reasigna

      // Reglas para cadenas de texto
      'prefer-template': 'off',  // Permitir concatenación de cadenas con `+`

      // Reglas para el uso de operadores
      'operator-linebreak': ['error', 'before'],  // Colocar el operador en la línea anterior al valor

      // Reglas de formato
      'comma-dangle': ['error', 'never'],  // Desactivar la coma al final de los objetos

      // Reglas de funciones y asignaciones
      'wrap-iife': ['error', 'inside'],  // Asegurar que las funciones sean invocadas dentro del paréntesis

      // Evitar reasignaciones
      'fp/no-mutation': 'error',  // No permitir la mutación de variables

      // Reglas de definición de variables
      'no-undef': 'error',  // Asegurarse de que no haya variables no definidas

      // Reglas para líneas en blanco y espacios en blanco al principio de los archivos
      'no-multiple-empty-lines': ['error', { 'max': 1 }],  // Permitir solo una línea vacía consecutiva
      'no-trailing-spaces': 'error',  // No permitir espacios al final de las líneas
    },
  },
];
