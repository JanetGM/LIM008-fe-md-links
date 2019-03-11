"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertiesOfDocumentMd = exports.filterPathWithExtensionMd = exports.travelDirectory = exports.convertPathRelToAbs = void 0;

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

  if (path.extname(pathToWalk) === '.md') {
    arrFileName.push(pathToWalk);
  } else {
    const readDirectory = fs.readdirSync(pathToWalk);
    readDirectory.forEach(filesName => {
      const absFileName = path.join(pathToWalk, filesName);
      const statss = fs.statSync(absFileName);

      if (statss.isDirectory()) {
        arrFileName = arrFileName.concat(travelDirectory(absFileName));
      } else if (statss.isFile) {
        arrFileName.push(absFileName);
      }
    });
  }

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
/** */

/**
 * Obtienes las propiedades de los links dentro de los documentos MD
 * @param {rutas a archivos MD} paths
 * @returns un array de objetos que contienene las propiedades de los links: path, href, title, text
 */


exports.filterPathWithExtensionMd = filterPathWithExtensionMd;

const getPropertiesOfDocumentMd = paths => {
  const arrFileName = travelDirectory(paths);
  const arrFilterFiles = filterPathWithExtensionMd(arrFileName);
  let reg = /((^|[^!])\[(.*)\])\S+/gm;
  let obj = [];
  const expRegtitle = /\[((.*))\]/gm;
  const hlinks = /\((.*)\)/gm;
  arrFilterFiles.forEach(pathFile => {
    let getTexto = fs.readFileSync(pathFile, 'utf-8');

    if (!getTexto.match(reg)) {
      console.log(`No se encontraron links en ${pathFile}`);
    } else {
      let resultadoReg = getTexto.match(reg).toString();
      let getTitle = resultadoReg.match(expRegtitle).toString();
      let hlink = resultadoReg.match(hlinks).toString();
      const arrTitle = getTitle.split(',');
      const arrHlink = hlink.split(',');
      arrTitle.forEach((title, position) => obj.push({
        href: arrHlink[position].substring(1, arrHlink[position].length - 1),
        text: arrTitle[position].substring(1, arrTitle[position].length - 1).slice(0, 50),
        file: pathFile
      }));
    }
  });
  return obj;
}; // console.log(getPropertiesOfDocumentMd('C://Users//Usuario//Documents//ProjectsLaboratoria//LIM008-fe-md-links//test//testFolder//folder1//folder1a//'))


exports.getPropertiesOfDocumentMd = getPropertiesOfDocumentMd;