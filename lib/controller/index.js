"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _path = require("../controller/path.js");

var _options = require("../controller/options.js");

const options = {
  validate: true
};

const mdLinks = (root, options) => {
  if (!options) {
    return new Promise(resolve => {
      resolve((0, _path.getPropertiesOfDocumentMd)(root)).then(response => response).catch(error => error);
    });
  } // cuando los dos son falsos


  if (options.validate) {
    return (0, _options.validateLinks)(root).then(response => response).catch(error => error);
  }

  if (options.validate === false) {
    return new Promise(resolve => {
      resolve((0, _path.getPropertiesOfDocumentMd)(root)).then(response => response).catch(error => error);
    });
  }
}; 
// mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder',{validate:false}).then(resp => console.log(resp));


exports.mdLinks = mdLinks;