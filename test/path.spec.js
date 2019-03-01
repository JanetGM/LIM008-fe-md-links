import {readDirectory,filterPathWithExtensionMd,getPropertiesOfDocumentMd,convertPathRelToAbs, concatPath} from '../src/controller/path.js';

describe('convertPathRelToAbs',() => {
   it('debería ser una función',() => {
    expect(typeof convertPathRelToAbs).toBe('function')
   });
   it('debería retornar una ruta absoluta',() => {
       expect(convertPathRelToAbs('test\\testFolder\\folder1\\folder1a\\file1.md')).toEqual('C:\\Users\\Usuario\\Documents\\ProjectsLaboratoria\\LIM008-fe-md-links\\test\\testFolder\\folder1\\folder1a\\file1.md');
   });
});

// describe('readDirectory',() => {
//     it('debería ser una función', () => {
//         expect(typeof readDirectory).toBe('function');
//     });
//     it('debería recorrer un directory y devolver todas las rutas de los archivos', (done) => {
//         readDirectory('test\\testFolder')
//         .then((isCorrect)=> {
//             expect(isCorrect.length).toBe(2);
//             done();
//         })
//         .catch((error) => {
//             console.log(error)
//             done();
//         })
//     });
//     it('debería recorrer un directory y devolver todas las rutas del contenido', (done) => {
//         readDirectory('test\testFolder')
//         .then((isCorrect)=> {
//             expect(isCorrect.length).toBe(2);    
//             done();
//         })
//         .catch((error) => {
//             // console.log(error)
//             done();
//         })
//     });
// });
        // const pathsArr = readDirectory('./testFolder');
        
       
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
// describe('getPropertiesOfDocumentMd',() => {
//     it('debería ser una función', () => {
//         expect(typeof getPropertiesOfDocumentMd).toBe('function');
//     });
//     it('debería un array de objetos que contienene las propiedades de los links',() => {
//         expect(getPropertiesOfDocumentMd('test\testFolder\folder1\folder1a')).toBe([])
//     })
// });