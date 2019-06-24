const rp = require('request-promise-native');

const baseUrl = 'https://swapi.co/api';

async function connector({
    endpointId, // This is the adapter key with endpoint key: `adapterKey:endpointKey`
    page, // The current page that is being requested
    filters, // An array of filter objects
    // Other options are in the documentation, but not requered or useable for this connector
}) {
    // Use the endpoint key to generate the right url
    // Alternatively we could have created a separate connector for each endpoint
    const uri = `${baseUrl}/${endpointId.split(':')[1]}`;

    const requestOptions = {
        uri,
        method: 'GET',
        json: true,
        qs: {
            page,
        },
        useQuerystring: true,
    };

    if (filters && filters.length) {
        // Concatinate all "expressions" in the passed filters and add them to the query string
        requestOptions.qs.search = filters
            .reduce((allExpressions, filter) => allExpressions.concat(filter.expressions), [])
            .join(',');
    }

    // Request the data and rename the results to things Swydo understands, like rows and resultCount
    const { results: rows, count: resultCount } = await rp(requestOptions);

    // `rows` contain the objects with field values.
    // `resultCount` will trigger automatic pagination, in case there are more results
    return { rows, resultCount };
}

module.exports = {
    connector,
};
