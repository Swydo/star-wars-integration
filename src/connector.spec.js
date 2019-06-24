const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');
const { connector } = require('./connector');
const nockData = require('./connector.spec.json');

describe('#connector', function () {
    before(function () {
        nock.define(nockData);
    });

    it('makes a valid request to SWAPI', async function () {
        const requestOptions = {
            endpointId: 'star-wars:starships',
            page: 1,
        };

        const result = await connector(requestOptions);

        expect(result).to.have.nested.property('rows');
        expect(result).to.have.nested.property('rows[0].name', 'Executor');
        expect(result).to.have.nested.property('resultCount', 37);
    });

    it('makes a valid request to SWAPI with a filter', async function () {
        const requestOptions = {
            endpointId: 'star-wars:starships',
            page: 1,
            filters: [
                {
                    key: 'name',
                    expressions: ['Executor'],
                    operator: 'INCLUDES',
                    caseSensitive: false,
                    caseInsensitive: true,
                    negate: false,
                },
            ],
        };

        const result = await connector(requestOptions);

        expect(result).to.have.nested.property('rows');
        expect(result).to.have.nested.property('rows[0].name', 'Executor');
        expect(result).to.have.nested.property('resultCount', 1);
    });
});
