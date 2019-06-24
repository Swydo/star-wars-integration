const { describe, it } = require('mocha');
const { expect } = require('chai');
const { buildCustomIntegration } = require('@swydo/custom-integrations');
const config = require('./adapter');

describe('adapter', function () {
    it('exports a valid adapter config', function () {
        const customIntegration = buildCustomIntegration(config);

        expect(customIntegration).to.be.a('function');
    });
});
