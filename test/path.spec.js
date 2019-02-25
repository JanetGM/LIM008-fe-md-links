import {runInDirectory,filterPathWithExtensionMd,getPropertiesOfDocumentMd} from '../src/controller/path.js';

describe('runInDirectory',() => {
    it('debería ser una función', () => {
        expect(typeof runInDirectory).toBe('function');
    });
    it('debería recorrer un directory y devolver todas las rutas de los archivos', () => {
        const pathsArr = runInDirectory('./testFolder');
        expect(pathsArr.length).toBe(3);
        expect(pathsArr.includes('./testFolder/folder1/folder1a/file1.md')).toBe(true);
        expect(pathsArr.includes('./testFolder/folder2/folder2a/file2.txt')).toBe(true);
        expect(pathsArr.includes('./testFolder/folder2/folder2b/file3.js')).toBe(true);
    });
    it('debería recorrer un directory y devolver todas las rutas de los archivos', () => {
        const pathsArr = runInDirectory('./testFolder/folder1');
        expect(pathsArr.length).toBe(1);
        expect(pathsArr.includes('./testFolder/folder1/folder1a/file1.md')).toBe(true);
    });
});
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
describe('getPropertiesOfDocumentMd',() => {
    it('debería ser una función', () => {
        expect(typeof getPropertiesOfDocumentMd).toBe('function');
    });
});