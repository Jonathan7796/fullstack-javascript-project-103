#!/usr/bin/env node

const { Command } = require("commander");
const genDiff = require("../src/index.js"); // Importamos la función principal

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>") 
  .option("-f, --format <type>", "output format", "stylish") // Opción para el formato de salida
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  }) 
  .helpOption("-h, --help", "output usage information");

program.parse(process.argv);
