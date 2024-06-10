const { expect } = require("chai");

const functionsTest = require('../index.js');

describe('addPessoa', () => {
    it('should return a 200', () => {
        const req = { body: { name: 'teste' } };
        const res = {
            send: (payload) => {
                expect(payload).toBe({result: `Pessoa adicionada com sucesso`});
            },
        };

        functionsTest.addPessoa(req, res);
    });
});