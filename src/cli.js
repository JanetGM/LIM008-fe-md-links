#!/usr/bin/env node

import {mdLinks} from './controller/index.js';
const args = process.argv.slice(2);

const options = {
  validate: false,
  stats: false
};


if (args.length === 1) {
  mdLinks(args[0], options);
}
if (args.length === 2) {
  if (args[1] === '--validate') {
    options.validate = true;
    mdLinks(args[0], options);
  } 
  if (args[1] === '--stats') {
    options.stats = true;
    mdLinks(args[0], options);
  } 
}

if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    mdLinks(args[0], options);
  }    
}