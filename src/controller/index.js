import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';

const options = {
  validate: true
};
export const mdLinks = (root, options) => {
  if (!options) {
    return new Promise((resolve, reject) => {
      resolve(getPropertiesOfDocumentMd(root));
    });
  }
  // cuando los dos son falsos
  if (options.validate) {
    return validateLinks(root);
  } 
  if (options.validate === false) {
    return new Promise((resolve, reject) => {
      resolve(getPropertiesOfDocumentMd(root));
    });
  }
};
mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a')
  .then(resp => console.log(resp));