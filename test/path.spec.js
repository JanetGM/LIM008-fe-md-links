import {readDirectory,filterPathWithExtensionMd,getPropertiesOfDocumentMd,convertPathRelToAbs, concatPath, travelDirectory} from '../src/controller/path.js';

describe('convertPathRelToAbs',() => {
   it('debería ser una función',() => {
    expect(typeof convertPathRelToAbs).toBe('function')
   });
   it('debería retornar una ruta absoluta',() => {
       expect(convertPathRelToAbs('test\\testFolder\\folder1\\folder1a\\file1.md')).toEqual('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md');
   });
});

    // it('debería recorrer un directory y devolver todas las rutas de los archivos', () => {
    //     const pathsArr = readDirectory('./testFolder/folder1');
    //     expect(pathsArr.length).toBe(1);
    //     expect(pathsArr.includes('./testFolder/folder1/folder1a/file1.md')).toBe(true);
    // });


describe('filterPathWithExtensionMd',() => {
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
describe('concatPath',() => {
    it('debería ser una función' , () => {
        expect(typeof concatPath).toBe('function');
    })
    it('debería concatenar el nombre del archivo con su ruta abs' , () => {
        expect(concatPath('options.js')).toEqual('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\src\\controller\\options.js');
    })
})
describe('travelDirectory',() => {
    it('debería ser una función',() => {
        expect(typeof travelDirectory).toBe('function')
    })
    it('deberia retornar todos los archivos' , () =>{
        expect(travelDirectory(
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder')).toEqual([ 
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md',
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\ji.md',
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder2\\folder2a\\file2.txt',
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder2\\folder2a\\jared.md',
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder2\\folder2b\\filed3.js',
                'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\sisi.md']);
    })
})
describe('getPropertiesOfDocumentMd',() => {
    it('debería ser una función', () => {
        expect(typeof getPropertiesOfDocumentMd).toBe('function');
    });
    it('debería un array de objetos que contienene las propiedades de los links',() => {
        expect(getPropertiesOfDocumentMd('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a')).toEqual(
            [ { href: 'link1',
            text: 'texto link1',
            file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md' },
          { href: 'link2',
            text: 'texto link2',
            file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md' },
          { href: 'link3',
            text: 'texto link3',
            file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md' },
          { href: 'link4',
            text: 'texto link4',
            file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md' },
          { href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\ji.md' } ])
    })
});