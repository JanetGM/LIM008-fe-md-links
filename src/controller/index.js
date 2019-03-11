import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';

// const options = {
//   validate :true
// }
export const mdLinks = (root, options) => {
  // cuando los dos son falsos
  if (options.validate) {
    return validateLinks(root);
  } else if (!options.validate) {
    return new Promise((resolve) => {
      resolve(getPropertiesOfDocumentMd(root));
    });
  }
};
// mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', options).then(resp => console.log(resp))
