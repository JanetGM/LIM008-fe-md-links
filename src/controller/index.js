import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';

const options = {
  validate: true
};
export const mdLinks = (root, options) => {
  if (!options) {
    return new Promise((resolve) => {
      resolve(getPropertiesOfDocumentMd(root)).then(response => response).catch(error => error);
    });
  }
  // cuando los dos son falsos
  if (options.validate) {
    return validateLinks(root).then(response => response).catch(error => error);
  } 
  if (options.validate === false) {
    return new Promise((resolve) => {
      resolve(getPropertiesOfDocumentMd(root)).then(response => response).catch(error => error);
    });
  }
};
// mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder',{validate:false}).then(resp => console.log(resp));