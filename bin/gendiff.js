#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

program
  .name("gendiff")
  .description("Compara dos archivos y muestra la diferencia.")
  .version("1.0.0")
  .helpOption("-h, --help", "Muestra información de ayuda");

program.parse(process.argv);
