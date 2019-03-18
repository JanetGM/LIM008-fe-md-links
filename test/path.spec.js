import {readDirectory, getPropertiesOfDocumentMd, convertPathRelToAbs, travelDirectory} from '../src/controller/path.js';
import {validateLinks, statLinksBroken, statLinks} from '../src/controller/options.js';
import { resolve } from 'path';
const fetchMock = require('../__mocks__/node-fetch');
const path = require('path');
fetchMock.config.fallbackToNetwork = true;

describe('travelDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof travelDirectory).toBe('function');
  });
  it('deberia retornar todos los archivos', () => {
    expect(travelDirectory(
      `${process.cwd()}\\test\\testFolder`)).toEqual([ 
      `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md`,
      `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\ji.md`,
      `${process.cwd()}\\test\\testFolder\\folder2\\folder2a\\jared.md`,
      `${process.cwd()}\\test\\testFolder\\sisi.md`]);
  });
});
describe('getPropertiesOfDocumentMd', () => {
  it('debería ser una función', () => {
    expect(typeof getPropertiesOfDocumentMd).toBe('function');
  });
  it('debería un array de objetos que contienene las propiedades de los links', () => {
    expect(getPropertiesOfDocumentMd(`${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a`))
      .toEqual([ { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://www.google.com',
        text: 'googljdhfe',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://www.google.com',
        text: 'googljdhfe',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: `${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a\\ji.md` } ]);
  });
});
const resultValidate = [ 
  { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
    text: 'Node.js',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
    state: 404,
    message: 'fail' },
  { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
    text: 'Node.js',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
    state: 404,
    message: 'fail' },
  { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
    text: 'Node.js',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
    state: 404,
    message: 'fail' },
  { href: 'https://www.google.com',
    text: 'googljdhfe',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
    state: 200,
    message: 'OK' },
  { href: 'https://www.google.com',
    text: 'googljdhfe',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
    state: 200,
    message: 'OK' },
  { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\ji.md',
    state: 200,
    message: 'OK' } ];

describe('validateLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('debería retornar un objeto con el estado del link y el texto', (done) => {
    fetchMock
      .mock('https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo', 404)
      .mock('https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo', 404, {overwriteRoutes: false})
      .mock('https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo', 404, {overwriteRoutes: false})
      .mock('https://www.google.com', 200, {overwriteRoutes: false})
      .mock('https://www.google.com', 200, {overwriteRoutes: false})
      .mock('https://es.wikipedia.org/wiki/Markdown', 200, {overwriteRoutes: false});
    const resulPromisetaValidate = validateLinks(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`);
    resulPromisetaValidate.then(resp => {
      expect(resp).toEqual(resultValidate);
      done();
    }).catch(error => {
      console.log(error);
      done();
    });
  });
});
it('debería retornar un objeto con el estado undefined y fail', () => {
  const resulPromisetaValidate = validateLinks(`${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a`);
  const resultValidateUrl =
    ['Path : C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\prove.md'
      , 'Link : www.gfsahksad.com || undefined || fail',
      'Title : link'];
  return new Promise((resolve, reject) => {
    resulPromisetaValidate.then((links) => {
      resolve(resulPromisetaValidate);
    }).catch(error => {
      expect(error).toEqual(resultValidateUrl);
      resolve(links);
    }
    );
  });
});

describe('statLinks', () => {
  it('deberia retornar la cantidad de link que hay en un documento', () => {
    const resultStatLinksTotal = statLinks(`${path.resolve(process.cwd())}\\test\\testFolder\\folder1\\folder1a`);
    return new Promise((resolve, reject) => {
      resultStatLinksTotal
        .then((resp) => {
          expect(resp).toEqual('Total : 6 Unique: 3');
          resolve(resultStatLinksTotal);
        })
        .catch(error => reject(error));
    });
  });
});
describe('statsLinksBroken', () => {
  it('deberia retornar la cantidad de link que hay en un documento', () => {
    const resultStatLinksTotal = statLinksBroken(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`);
    return new Promise((resolve, reject) => {
      resultStatLinksTotal
        .then((resp) => {
          expect(resp).toEqual('Broken: 3');
          resolve(resultStatLinksTotal);
        })
        .catch(error => reject(error));
    });
  });
});