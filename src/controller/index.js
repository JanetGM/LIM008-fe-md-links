import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';


const options = {
  validate: true,
  stats: true
};
export const mdLinks = (root, options) => {
  // cuando los dos son falsos
  if (!options.validate && !options.stats) {
    return console.log(getPropertiesOfDocumentMd(root));
  } 
  if (!options.validate && options.stats) {
    return statLinks(root).then(resp => console.log(resp));
  } 
  if (options.validate && !options.stats) {
    console.log('calcular el valor los links validados');
    return validateLinks(root).then(resp => console.log(resp));
  } 
  if (options.validate && options.stats) {
    const magia = [statLinksBroken(root), statLinks(root)];
    return Promise.all(magia).then(resp => console.log(resp));
  } 
};
// mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', options);