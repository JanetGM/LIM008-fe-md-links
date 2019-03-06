"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = exports.validate = void 0;

var _path = require("./path.js");

const fetch = require('node-fetch');

const validate = (root, done) => {
  const getPropertiesOfDocument = (0, _path.getPropertiesOfDocumentMd)(root);
  console.log(getPropertiesOfDocument);
  getPropertiesOfDocument.map(e => {
    fetch(e.href).then(resp => {
      done({
        href: e.href,
        text: e.text,
        file: e.file,
        estado: resp.status,
        stateText: resp.statusText
      });
    }).catch(error => console.log(error));
  });
}; // validate('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', (result) =>{
//     console.log(result);
// });

/**
 * 
 * @param {array de objetos de rutas y propiedades de los links de c/d carpeta} arrObjectOfPath
 * @returns retorna un array de objetos y sus estadisticas
 */


exports.validate = validate;

const stats = root => {
  const arrObjectLinks = (0, _path.getPropertiesOfDocumentMd)(root);
  arrObjectLinks.filter(e => e.stateText === 'OK');
  const total = arrObjectLinks.length;
  return total;
};

exports.stats = stats;
console.log(stats('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a'));