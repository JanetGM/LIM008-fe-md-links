import { read } from 'fs';

const path = require('path')
const fs = require('fs')
/**
 * Verifica si la ruta existe 
 * @param {ruta relativa} pathsRelative 
 * @returns un string  con la rutas convertida a absoluta
 */
export const convertPathRelToAbs  = (pathRelative) => {
    const absoluta = path.resolve(pathRelative);
    return absoluta;
} 

export const travelDirectory = (pathToWalk) => {
    let arrFileName = [];
    const readDirectory = fs.readdirSync(pathToWalk);
    readDirectory.forEach((filesName) => {
        const absFileName = path.join(pathToWalk,filesName);
        const statss = fs.statSync(absFileName)
            if(statss.isDirectory()){
                arrFileName = arrFileName.concat(travelDirectory(absFileName));
            }else{
                arrFileName.push(filesName)
            }
        });
 
    return filtrandoArchivos;
}
/**
 * Filtra las rutas pasadas como parametros,
 * quedándose solamente con aquellas que son MD
 * 
 * @param {array a filtrar} pathsArr 
 * @returns un array de rutas con extensión MD
 */
export const filterPathWithExtensionMd = (pathArr) => {
    return pathArr.filter(file => path.extname(file) === '.md')
}
export const concatPath = (fileName) => {
    return path.join(__dirname,fileName)
}
/** */
/**
 * Obtienes las propiedades de los links dentro de los documentos MD
 * @param {rutas a archivos MD} pathsMdArr
 * @returns un array de objetos que contienene las propiedades de los links: path, href, title, text
 */
// export const getPropertiesOfDocumentMd = (pathsMdArr) => {
//     const filterMdDoc = filterPathWithExtensionMd(pathsMdArr)
//     return filterMdDoc;
// // }
// console.log(getPropertiesOfDocumentMd('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md'));
export const getPropertiesOfDocumentMd = (pathsMdArr) => {
    const obj = []
    const filterMdDoc = filterPathWithExtensionMd(pathsMdArr)
    let texto = fs.readFileSync(pathsMdArr, 'utf-8');
    const reg = /((^|[^!])\[(.*)\])\S+/gm;
    let resultadoReg = texto.match(reg)
    resultadoReg.forEach(e => {
     const textLink = e
     obj.push(textLink)
    })    
    return obj ;
}

console.log(getPropertiesOfDocumentMd('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md'));
