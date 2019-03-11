#!/usr/bin/env node
import {mdLinks} from './controller/index.js';
import {statLinks, statLinksBroken} from './controller/options.js';
const args = process.argv.slice(2);

const options = {
  validate: false,
  stats: false
};

if (args.length === 1) {
  options.validate = true; 
  mdLinks(args[0], options).then(resp => resp.map(links => console.log(`\n Path :${links.file} \n Link : ${links.href}  \n texto : ${links.text}`)))

}
if (args.length === 2) {
  if (args[1] === '--validate') {
    options.validate = true;
    mdLinks(args[0], options).then(resp => resp.map(links => console.log(`\n Path :${links.file} \n Link : ${links.href} ${links.state} ${links.message} \n texto : ${links.text}`)))
  }
  
  if (args[1] === '--stats') {
    options.stats = true;
    statLinks(args[0]).then(resp => console.log(resp))
  }
}


if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    const promiseStats = [statLinksBroken(args[0]), statLinks(args[0]) ];
    Promise.all(promiseStats).then(resp => console.log(resp));
  }    
}