const rp = require('request-promise-native');

const baseUrl = 'https://swapi.dev/api';

async function connector({
    page, // The current page that is being requested
    filters, // An array of filter objects
    // Other options are in the documentation, but not required or usable for this connector
}, {
    // This is a property specific to the star-wars integration that allows this function to be used for multiple
    // endpoints in SWAPI. By setting this variable this function can be reused for multiple endpoints.
    path,
}) {
    // Use the endpoint key to generate the right url
    // Alternatively we could have created a separate connector for each endpoint
    const uri = `${baseUrl}${path}`;

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

const starshipsConnector = request => connector(request, { path: '/starships' });

module.exports = {
    connector,
    starshipsConnector,
};
