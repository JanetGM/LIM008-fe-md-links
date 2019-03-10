#!/usr/bin/env node
"use strict";

var _index = require("./controller/index.js");

const args = process.argv.slice(2);
const options = {
  validate: false,
  stats: false
};

if (args.length === 1) {
  (0, _index.mdLinks)(args[0], options);
}

if (args.length === 2) {
  if (args[1] === '--validate') {
    options.validate = true;
    (0, _index.mdLinks)(args[0], options);
  }

  if (args[1] === '--stats') {
    options.stats = true;
    (0, _index.mdLinks)(args[0], options);
  }
}

if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    (0, _index.mdLinks)(args[0], options);
  }
}