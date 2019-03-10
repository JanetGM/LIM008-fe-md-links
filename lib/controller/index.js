"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _path = require("../controller/path.js");

var _options = require("../controller/options.js");

const options = {
  validate: true,
  stats: true
};

const mdLinks = (root, options) => {
  // cuando los dos son falsos
  if (!options.validate && !options.stats) {
    return console.log((0, _path.getPropertiesOfDocumentMd)(root));
  }

  if (!options.validate && options.stats) {
    return (0, _options.statLinks)(root).then(resp => console.log(resp));
  }

  if (options.validate && !options.stats) {
    console.log('calcular el valor los links validados');
    return (0, _options.validateLinks)(root).then(resp => console.log(resp));
  }

  if (options.validate && options.stats) {
    const magia = [(0, _options.statLinksBroken)(root), (0, _options.statLinks)(root)];
    return Promise.all(magia).then(resp => console.log(resp));
  }
}; // mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', options);


exports.mdLinks = mdLinks;