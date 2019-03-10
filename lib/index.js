"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _path = require("../src/controller/path.js");

var _options = require("../src/controller/options");

const validate = (root, options) => {
  let resp = null;

  if (root && !options) {
    //cuando sólo ingresa la ruta  que sucede 
    resp = (0, _path.travelDirectory)(root);
  } else if (root && options) {
    //cuando ingresa la ruta y una opción
    if (root && options === 'validate') {}

    if (root && options === 'stats') {}
  } else {
    console.log('no ingreso');
  }

  return resp;
};

exports.validate = validate;
console.log(validate('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1'));