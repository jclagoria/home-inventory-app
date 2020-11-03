const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const cvsData = fs.readFileSync(
    path.join(__dirname, '..', '..', 'db', 'sources',  'countries.csv'),
    'utf8'
);

const countries = Papa.parse(cvsData, {
    header: true
});

module.exports = countries.data.map(
    ({name, 'alpha-2': code}) => ({
        name,
        code
    })
);
