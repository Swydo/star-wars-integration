const { starshipsConnector } = require('./connector');

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
        id: 'name',
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
        id: 'model',
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
        id: 'starship_class',
        name: 'Starship Class',
        type: 'String',
        isDimension: true,
        isMetric: true,
    },
    {
        id: 'manufacturer',
        name: 'Manufacturer',
        type: 'String',
        isDimension: true,
        isMetric: true,
    },
    {
        id: 'cost_in_credits',
        name: 'Cost',
        type: 'Number',
        aggregate: 'average',
    },
    {
        id: 'length',
        name: 'Length',
        type: 'Number',
        aggregate: 'average',
    },
    {
        id: 'crew',
        name: 'Crew',
        type: 'Number',
        formula: 'crew := 0',
        aggregate: 'average',
    },
    {
        id: 'passengers',
        name: 'Passengers',
        type: 'Number',
        formula: 'passengers := 0',
        aggregate: 'average',
    },
    {
        id: 'max_atmosphering_speed',
        name: 'Max speed (atmospher)',
        type: 'Number',
        formula: 'max_atmosphering_speed := 0',
        aggregate: 'average',
    },
    {
        id: 'hyperdrive_rating',
        name: 'Hyperdrive rating',
        type: 'String',
    },
    {
        id: 'MGLT',
        name: 'Megalight',
        type: 'String',
    },
    {
        id: 'cargo_capacity',
        name: 'Cargo capacity',
        type: 'Number',
        formula: 'cargo_capacity := 0',
        aggregate: 'average',
    },
    {
        id: 'consumables',
        name: 'Consumables',
        type: 'String',
    },
];

const endpoints = [
    {
        id: 'starships',
        isSelectable: true,
        dateRange: {
            enabled: false,
        },
        pagination: {
            perPage: 10,
        },
        connector: starshipsConnector,
        fields,
    },
];

const adapter = {
    id: 'star-wars',
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
    rateLimits: [rateLimit],
    endpoints,
};

module.exports = {
    adapter,
};
