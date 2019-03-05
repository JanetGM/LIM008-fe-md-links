
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
                arrFileName.push(absFileName)
            }
        });
 
    return arrFileName;
}
console.log(travelDirectory('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\src\\controller'));
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
export const getPropertiesOfDocumentMd = (pathsMdArr) => {
    const arrFileName = travelDirectory(pathsMdArr)
    const arrFilterFiles = filterPathWithExtensionMd(arrFileName)
    let reg = /((^|[^!])\[(.*)\])\S+/gm;
    let obj = [];
    const expRegtitle = /\[((.*))\]/gm;
    const hlinks = /\((.*)\)/gm;
    arrFilterFiles.forEach(pathFile => {
        let getTexto = fs.readFileSync(pathFile, 'utf-8');
        let resultadoReg = getTexto.match(reg).toString();
        let getTitle = resultadoReg.match(expRegtitle).toString();
        let hlink = resultadoReg.match(hlinks).toString();
        const arrTitle = getTitle.split(',')
        const arrHlink = hlink.split(',')
        console.log(arrHlink);
        arrTitle.forEach((e,i)=>
            obj.push(
                {
                    root : pathFile,
                    title :arrTitle[i].substring(1,arrTitle[i].length-2),
                    href:arrHlink[i].substring(1,arrHlink[i].length-2)
                }
            )
        )
       
    })
return obj
}
console.log(getPropertiesOfDocumentMd('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a'));