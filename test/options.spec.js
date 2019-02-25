import {validate,stats} from '../src/controller/options.js';
describe(('validate') , () => {
    it('debería ser una función' , () => {
        expect(typeof validate).toBe('function')
    });
});
describe(('stats') , () => {
    it('debería ser una función' , () => {
        expect(typeof stats).toBe('function')
    });
});