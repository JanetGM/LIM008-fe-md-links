import {getPropertiesOfDocumentMd} from './path.js'; 
import { link, promises } from 'fs';
const fetch = require('node-fetch');

export const validate = (root) => {
const getLinks = getPropertiesOfDocumentMd(root)
const recorreLinks = getLinks.map(links=> new Promise((resolve,reject)=> {
   const href = fetch(links.href)
    .then(resp=>{
        if(resp.status>=200 && resp.status<400){
            links.state = resp.status
            links.message = resp.statusText
            resolve(links)
        }else{
            links.state = resp.status
            links.message = 'fail'
            resolve(links)
        }

    }).catch((error)=> {
        links.state='no es url'
        links.message='fail'
        resolve(links)
    }      
)}))
return Promise.all(recorreLinks)
}


// validate('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a')
// .then(resp => console.log(resp))
// .catch(err => console.log(err))

export const statLinks = (paths,options) => { 
const validateArr = validate(paths)
return new Promise ((resolve,reject)=>{
    validateArr.then((resp) =>{
        const total = resp.length
        const linkUnique =  [... new Set(resp)].length
        resolve([total,linkUnique])
    }
    ).catch(error=>reject(error))
})
}
export const statLinksBroken = (paths) => {
        const validateArr = validate(paths)
        return new Promise ((resolve,reject)=>{
            validateArr.then((resp) => {
                const filterBroken = resp.filter(links=>links.message==='fail')
                    resolve(filterBroken.length);
                }
            ).catch(error=>reject(error))
   })
}

// statLinksTotal('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a').then(resp=>console.log(resp)).catch(error=>console.log(error))