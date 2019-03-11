import {convertPathRelToAbs, travelDirectory, getPropertiesOfDocumentMd} from '../controller/path.js';
import {validateLinks, statLinks, statLinksBroken} from '../controller/options.js';


const options = {
  validate: true,
  stats: true
};

export const mdLinks = (root, options) => {
  // cuando los dos son falsos
  if (!options.validate && !options.stats) {
    const objectLinks = getPropertiesOfDocumentMd(root);
    return objectLinks.map(resp => console.log(` Path : ${resp.file}\n Link : ${resp.href}\n Title : ${resp.text}\n`));
  } 
  if (!options.validate && options.stats) {
    return statLinks(root).then(resp => console.log(resp));
  } 
  if (options.validate && !options.stats) {
    return validateLinks(root).then(resp => resp.map(links => console.log(` Path : ${links.file}\n Link : ${links.href}${links.state}${links.text}\n Title : ${links.text}\n`)));
  } 
  if (options.validate && options.stats) {
    const magia = [statLinksBroken(root), statLinks(root)];
    return Promise.all(magia).then(resp => console.log(resp));
  } 
};
// mdLinks('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a', options);