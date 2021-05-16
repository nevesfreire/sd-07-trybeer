const app = require('./server');

const PORT = process.env.PORT || 3001;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`listening on ${PORT} `);
    });
}
