import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';

const options = {
  validate: true
};
export const mdLinks = (root, options) => {
  if (!options) {
    return new Promise((resolve) => {
      resolve(getPropertiesOfDocumentMd(root));
    });
  } else if (options.validate) {
    return validateLinks(root).then(response => response).catch(error => error);
  } else if (options.validate === false) {
    return new Promise((resolve) => {
      resolve(getPropertiesOfDocumentMd(root));
    });
  }
};