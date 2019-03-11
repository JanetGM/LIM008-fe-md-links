#!/usr/bin/env node
"use strict";

var _index = require("./controller/index.js");

var _options = require("./controller/options.js");

const args = process.argv.slice(2);
const options = {
  validate: false,
  stats: false
};

if (args.length === 1) {
  options.validate = true;
  (0, _index.mdLinks)(args[0], options).then(resp => resp.map(links => console.log(`\n Path :${links.file} \n Link : ${links.href}  \n texto : ${links.text}`)));
}

if (args.length === 2) {
  if (args[1] === '--validate') {
    options.validate = true;
    (0, _index.mdLinks)(args[0], options).then(resp => resp.map(links => console.log(`\n Path :${links.file} \n Link : ${links.href} ${links.state} ${links.message} \n texto : ${links.text}`)));
  }

  if (args[1] === '--stats') {
    options.stats = true;
    (0, _options.statLinks)(args[0]).then(resp => console.log(resp));
  }
}

if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    const promiseStats = [(0, _options.statLinksBroken)(args[0]), (0, _options.statLinks)(args[0])];
    Promise.all(promiseStats).then(resp => resp.forEach(result => console.log(result)));
  }
}