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
/**
 * Recorre todo la ruta que uno le ingresa de manera recursiva
 * 
 * @param {ruta a recorrer} pathToWalk
 * @returns Array de todas las rutas absolutas, dentro del directorio 
 */
// export const readDirectory = (pathToWalk) => {
//     return new Promise ((resolve, reject) => {
//         fs.readdir(pathToWalk, (error, fileList) => {
//             if(error){
//                 reject(error)
//             }
//             resolve(fileList)});
//     })
//     }

/** */
/**
 * Obtienes las propiedades de los links dentro de los documentos MD
 * @param {rutas a archivos MD} pathsMdArr
 * @returns un array de objetos que contienene las propiedades de los links: path, href, title, text
 */
// export const getPropertiesOfDocumentMd = (pathsMdArr) => {
//     return [];
// }
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
 
    return arrFileName;
}
console.log(recorrerDirectorio('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder'));
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


