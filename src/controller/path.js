const path = require('path');
const fs = require('fs');
/**
 * Verifica si la ruta existe 
 * @param {ruta relativa} pathsRelative 
 * @returns un string  con la rutas convertida a absoluta
 */
export const travelDirectory = (pathToWalk) => {
  let arrFileName = [];
  if (path.extname(pathToWalk) === '.md') {
    arrFileName.push(pathToWalk);
  } else {
    const readDirectory = fs.readdirSync(pathToWalk);
    readDirectory.forEach((filesName) => {
      const absFileName = path.join(pathToWalk, filesName);
      const statss = fs.statSync(absFileName);
      if (statss.isDirectory()) {
        arrFileName = [...arrFileName, ...(travelDirectory(absFileName))]; // concatenar con  ES6
      } else if (statss.isFile) {
        if (path.extname(absFileName).toLowerCase() === '.md') {
          arrFileName.push(absFileName);
        }
      }
    });    
  }
  return arrFileName;
};

/** */
/**
 * Obtienes las propiedades de los links dentro de los documentos MD
 * @param {rutas a archivos MD} paths
 * @returns un array de objetos que contienene las propiedades de los links: path, href, title, text
 */
export const getPropertiesOfDocumentMd = (paths) => {
  const arrFileName = travelDirectory(paths);
  let reg = /((^|[^!])\[(.*)\])\S+/gm;
  let obj = [];
  const expRegtitle = /\[((.*))\]/gm;
  const hlinks = /\((.*)\)/gm;
  arrFileName.forEach(pathFile => {
    let getTexto = fs.readFileSync(pathFile, 'utf-8');
    if (!getTexto.match(reg)) {
      console.log(`No se encontraron links en ${pathFile}`);
    } else {
      let resultadoReg = getTexto.match(reg).toString();
      let getTitle = resultadoReg.match(expRegtitle).toString();
      let hlink = resultadoReg.match(hlinks).toString();
      const arrTitle = getTitle.split(',');
      const arrHlink = hlink.split(',');
      arrTitle.forEach((title, position) =>
        obj.push(
          {
            href: arrHlink[position].split((/[\(\)]/))[1],
            text: (arrTitle[position].split(/[\[\]]/))[1].slice(0, 50),
            file: pathFile                    
          }
        )
      );
    }
  } 
  );
  return obj ;
};

