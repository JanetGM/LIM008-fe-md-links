import {readDirectory, filterPathWithExtensionMd, getPropertiesOfDocumentMd, convertPathRelToAbs, concatPath, travelDirectory} from '../src/controller/path.js';
import {validateLinks, statLinksBroken, statLinks} from '../src/controller/options.js';
import { resolve } from 'path';
describe('convertPathRelToAbs', () => {
  it('debería ser una función', () => {
    expect(typeof convertPathRelToAbs).toBe('function');
  });
  it('debería retornar una ruta absoluta', () => {
    expect(convertPathRelToAbs('test\\testFolder\\folder1\\folder1a\\file1.md')).toEqual(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md`);
  });
});

describe('filterPathWithExtensionMd', () => {
  it('debería ser una función', () => {
    expect(typeof filterPathWithExtensionMd).toBe('function');
  });
  it('dado un array de rutas, deberia extraer solo las MD', () => {
    const pathsArr = [
      './testFolder/folder1/folder1a/file1.md',
      './testFolder/folder2/folder2a/file2.txt',
      './testFolder/folder2/folder2b/file3.js',
    ];
        
    const pathsMdArr = filterPathWithExtensionMd(pathsArr);
    expect(pathsMdArr.length).toBe(1);
    expect(pathsArr.includes('./testFolder/folder1/folder1a/file1.md')).toBe(true);
  });
});
describe('travelDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof travelDirectory).toBe('function');
  });
  it('deberia retornar todos los archivos', () => {
    expect(travelDirectory(
      `${process.cwd()}\\test\\testFolder`)).toEqual([ 
      `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md`,
      `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\ji.md`,
      `${process.cwd()}\\test\\testFolder\\folder2\\folder2a\\file2.txt`,
      `${process.cwd()}\\test\\testFolder\\folder2\\folder2a\\jared.md`,
      `${process.cwd()}\\test\\testFolder\\folder2\\folder2b\\filed3.js`,
      `${process.cwd()}\\test\\testFolder\\sisi.md`]);
  });
});
describe('getPropertiesOfDocumentMd', () => {
  it('debería ser una función', () => {
    expect(typeof getPropertiesOfDocumentMd).toBe('function');
  });
  it('debería un array de objetos que contienene las propiedades de los links', () => {
    expect(getPropertiesOfDocumentMd(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`))
      .toEqual([ { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://github.com/natalyJallo/lim-2018-11-bc-core-am-data-lo',
        text: 'Node.js',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://www.google.com',
        text: 'googljdhfe',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://www.google.com',
        text: 'googljdhfe',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\file1.md` },
      { href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: `${process.cwd()}\\test\\testFolder\\folder1\\folder1a\\ji.md` } ]);
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
  it('debería retornar un objeto con el estado del link y el texto', () => {
    const resulPromisetaValidate = validateLinks(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`);
    return new Promise((resolve, reject) => {
      resulPromisetaValidate.then((resp) => {
        expect(resp).toEqual(resultValidate);
        resolve(resulPromisetaValidate);
      }).catch(error => reject(error));
    });
  });
  it('debería retornar un objeto con el estado undefined y fail', () => {
    const resulPromisetaValidate = validateLinks(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`);
    const resultValidateUrl =
    ['Path : C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\prove.md'
      , 'Link : www.gfsahksad.com || undefined || fail',
      'Title : link'];
    return new Promise((resolve, reject) => {
      resulPromisetaValidate.then((links) => {
        resolve(resulPromisetaValidate);
      }).catch(error => {
        console.log('ya entro');
        expect(error).toEqual(resultValidateUrl);
        resolve(links);
      }
      );
    });
  });
});
describe('statLinks', () => {
  it('deberia retornar la cantidad de link que hay en un documento', () => {
    const resultStatLinksTotal = statLinks(`${process.cwd()}\\test\\testFolder\\folder1\\folder1a`);
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