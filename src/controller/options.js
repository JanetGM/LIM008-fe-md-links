import {getPropertiesOfDocumentMd} from './path.js'; 
const fetch = require('node-fetch')

export const validate = (root, done) => {
    const getPropertiesOfDocument = getPropertiesOfDocumentMd(root)
    getPropertiesOfDocument.map(e=>{
        fetch(e.href)
        .then((resp) => {
           done({
               href:e.href,
               text:e.text,
               file:e.file,
               estado:resp.status,
               stateText:resp.statusText
            });
        })
        .catch(error=> console.log(error))
    })
}
// validate('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', (result) =>{
//     console.log(result);
    
// });
/**
 * 
 * @param {array de objetos de rutas y propiedades de los links de c/d carpeta} arrObjectOfPath
 * @returns retorna un array de objetos y sus estadisticas
 */
export const stats = (root) => {
    const arrObjectLinks = getPropertiesOfDocumentMd(root)
    arrObjectLinks.filter(e=>e.stateText==='OK');
    const total = arrObjectLinks.length;
return total
} 
console.log(stats('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a'));