const app = require('./app');

const port = process.env.PORT || 7070;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

