"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _path = require("../controller/path.js");

var _options = require("../controller/options.js");

// const options = {
//   validate :true
// }
const mdLinks = (root, options) => {
  // cuando los dos son falsos
  if (options.validate) {
    return (0, _options.validateLinks)(root);
  }
}; // mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', options).then(resp => console.log(resp))


exports.mdLinks = mdLinks;