"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statLinksBroken = exports.statLinks = exports.validate = void 0;

var _path = require("./path.js");

var _fs = require("fs");

const fetch = require('node-fetch');

const validate = root => {
  const getLinks = (0, _path.getPropertiesOfDocumentMd)(root);
  const recorreLinks = getLinks.map(links => new Promise((resolve, reject) => {
    const href = fetch(links.href).then(resp => {
      if (resp.status >= 200 && resp.status < 400) {
        links.state = resp.status;
        links.message = resp.statusText;
        resolve(links);
      } else {
        links.state = resp.status;
        links.message = 'fail';
        resolve(links);
      }
    }).catch(error => {
      links.state = 'no es url';
      links.message = 'fail';
      resolve(links);
    });
  }));
  return Promise.all(recorreLinks);
};

exports.validate = validate;
validate('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a').then(resp => console.log(resp)).catch(err => console.log(err));

const statLinks = (paths, options) => {
  const validateArr = validate(paths);
  return new Promise((resolve, reject) => {
    validateArr.then(resp => {
      const total = resp.length;
      const linkUnique = [...new Set(resp)].length;
      resolve([total, linkUnique]);
    }).catch(error => reject(error));
  });
};

exports.statLinks = statLinks;

const statLinksBroken = paths => {
  const validateArr = validate(paths);
  return new Promise((resolve, reject) => {
    validateArr.then(resp => {
      const filterBroken = resp.filter(links => links.message === 'fail');
      resolve(filterBroken.length);
    }).catch(error => reject(error));
  });
}; // statLinksTotal('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a').then(resp=>console.log(resp)).catch(error=>console.log(error))


exports.statLinksBroken = statLinksBroken;