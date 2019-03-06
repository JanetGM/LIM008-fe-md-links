"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertiesOfDocumentMd = exports.concatPath = exports.filterPathWithExtensionMd = exports.travelDirectory = exports.convertPathRelToAbs = void 0;

const path = require('path');

const fs = require('fs');
/**
 * Verifica si la ruta existe 
 * @param {ruta relativa} pathsRelative 
 * @returns un string  con la rutas convertida a absoluta
 */


const convertPathRelToAbs = pathRelative => {
  const absoluta = path.resolve(pathRelative);
  return absoluta;
};

exports.convertPathRelToAbs = convertPathRelToAbs;

const travelDirectory = pathToWalk => {
  let arrFileName = [];
  const readDirectory = fs.readdirSync(pathToWalk);
  readDirectory.forEach(filesName => {
    const absFileName = path.join(pathToWalk, filesName);
    const statss = fs.statSync(absFileName);

    if (statss.isDirectory()) {
      arrFileName = arrFileName.concat(travelDirectory(absFileName));
    } else {
      arrFileName.push(absFileName);
    }
  });
  return arrFileName;
};
/**
 * Filtra las rutas pasadas como parametros,
 * quedándose solamente con aquellas que son MD
 * 
 * @param {array a filtrar} pathsArr 
 * @returns un array de rutas con extensión MD
 */


exports.travelDirectory = travelDirectory;

const filterPathWithExtensionMd = pathArr => {
  return pathArr.filter(file => path.extname(file) === '.md');
};

exports.filterPathWithExtensionMd = filterPathWithExtensionMd;

const concatPath = fileName => {
  return path.join(__dirname, fileName);
};
/** */

/**
 * Obtienes las propiedades de los links dentro de los documentos MD
 * @param {rutas a archivos MD} pathsMdArr
 * @returns un array de objetos que contienene las propiedades de los links: path, href, title, text
 */


exports.concatPath = concatPath;

const getPropertiesOfDocumentMd = pathsMdArr => {
  const arrFileName = travelDirectory(pathsMdArr);
  const arrFilterFiles = filterPathWithExtensionMd(arrFileName);
  let reg = /((^|[^!])\[(.*)\])\S+/gm;
  let obj = [];
  const expRegtitle = /\[((.*))\]/gm;
  const hlinks = /\((.*)\)/gm;
  arrFilterFiles.forEach(pathFile => {
    let getTexto = fs.readFileSync(pathFile, 'utf-8');
    let resultadoReg = getTexto.match(reg).toString();
    let getTitle = resultadoReg.match(expRegtitle).toString();
    let hlink = resultadoReg.match(hlinks).toString();
    const arrTitle = getTitle.split(',');
    const arrHlink = hlink.split(',');
    arrTitle.forEach((e, i) => obj.push({
      href: arrHlink[i].substring(1, arrHlink[i].length - 1),
      text: arrTitle[i].substring(1, arrTitle[i].length - 1),
      file: pathFile
    }));
  });
  return obj;
};

exports.getPropertiesOfDocumentMd = getPropertiesOfDocumentMd;