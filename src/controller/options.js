import {getPropertiesOfDocumentMd} from './path.js'; 
const fetch = require('node-fetch');

export const validateLinks = (root) => {
  const getLinks = getPropertiesOfDocumentMd(root);
  const recorreLinks = getLinks.map(links => new Promise((resolve, reject) => {
    const href = fetch(links.href)
      .then(resp => {
        if (resp.status >= 200 && resp.status < 400) {
          links.state = resp.status;
          links.message = resp.statusText;
          resolve(links);
        } else {
          links.state = resp.status;
          links.message = 'fail';
          resolve(links);
        }
      }).catch((error) => {
        links.state = 'no es url';
        links.message = 'fail';
        resolve(links);
      }      
      );
  }));
  return Promise.all(recorreLinks);
};


// validateLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a')
// .then(resp => console.log(resp))
// .catch(err => console.log(err))

export const statLinks = (paths) => { 
  const validateArr = validateLinks(paths);
  return new Promise((resolve, reject) => {
    validateArr.then((resp) => {
      const total = resp.length;
      const linkUnique = [... new Set(resp.map(resp => resp.href))].length;
      resolve(`Total : ${total} Unique: ${linkUnique}`);
    }
    ).catch(error => reject(error));
  });
};
export const statLinksBroken = (paths) => {
  const validateArr = validateLinks(paths);
  return new Promise((resolve, reject) => {
    validateArr.then((resp) => {
      const filterBroken = resp.filter(links => links.message === 'fail');
      resolve(`Broken: ${filterBroken.length}`);
    }
    ).catch(error => resolve(error));
  });
};

// statLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a').then(resp=>console.log(resp)).catch(error=>console.log(error))