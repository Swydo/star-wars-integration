const { connector } = require('./connector');

const SEARCH_FILTER_OPERATORS = [
    {
        type: 'INCLUDES',
        capabilities: {
            caseSensitive: false,
            caseInsensitive: true,
            negate: false,
        },
    },
];

const rateLimit = {
    resetInterval: 1000,
    requests: 1,
    per: ['endpoint'],
};

const fields = [
    {
        key: 'name',
        name: 'Name',
        type: 'String',
        isDimension: true,
        isMetric: true,
        filter: {
            max: 1,
            operators: SEARCH_FILTER_OPERATORS,
            optionsRequest: {
                idField: 'name',
                nameField: 'name',
            },
        },
    },
    {
        key: 'model',
        name: 'Model',
        type: 'String',
        isDimension: true,
        isMetric: true,
        filter: {
            max: 1,
            operators: SEARCH_FILTER_OPERATORS,
            optionsRequest: {
                idField: 'model',
                nameField: 'model',
            },
        },
    },
    {
        key: 'starship_class',
        name: 'Starship Class',
        type: 'String',
        isDimension: true,
        isMetric: true,
    },
    {
        key: 'manufacturer',
        name: 'Manufacturer',
        type: 'String',
        isDimension: true,
        isMetric: true,
    },
    {
        key: 'cost_in_credits',
        name: 'Cost',
        type: 'Number',
        aggregate: 'average',
    },
    {
        key: 'length',
        name: 'Length',
        type: 'Number',
        aggregate: 'average',
    },
    {
        key: 'crew',
        name: 'Crew',
        type: 'Number',
        formula: 'crew := 0',
        aggregate: 'average',
    },
    {
        key: 'passengers',
        name: 'Passengers',
        type: 'Number',
        formula: 'passengers := 0',
        aggregate: 'average',
    },
    {
        key: 'max_atmosphering_speed',
        name: 'Max speed (atmospher)',
        type: 'Number',
        formula: 'max_atmosphering_speed := 0',
        aggregate: 'average',
    },
    {
        key: 'hyperdrive_rating',
        name: 'Hyperdrive rating',
        type: 'String',
    },
    {
        key: 'MGLT',
        name: 'Megalight',
        type: 'String',
    },
    {
        key: 'cargo_capacity',
        name: 'Cargo capacity',
        type: 'Number',
        formula: 'cargo_capacity := 0',
        aggregate: 'average',
    },
    {
        key: 'consumables',
        name: 'Consumables',
        type: 'String',
    },
];

const endpoints = [
    {
        key: 'starships',
        isSelectable: true,
        dateRange: {
            enabled: false,
        },
        comparison: {
            enabled: false,
        },
        pagination: {
            perPage: 10,
        },
        connector,
        fields,
    },
];

const adapter = {
    key: 'star-wars',
    authentication: {
        type: 'form',
        formOptions: {
            fields: [
                {
                    label: 'Name',
                    type: 'text',
                    key: 'name',
                    placeholder: 'Enter connection name',
                },
            ],
        },
    },
    rateLimit,
    endpoints,
};

module.exports = {
    adapter,
};
