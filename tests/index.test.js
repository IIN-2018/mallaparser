const { getCarreraData } = require('../src/index.js');

describe('Get Carrera Data', () => {
    test('Get', () => {
        let carrera = getCarreraData('./public/Malla.xlsx', 'IIN');
        expect(carrera).toHaveLength(10);
    });
});
