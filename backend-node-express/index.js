const app = require('./src/app');

const PORT = 5000;

app.listen(PORT, () => {
    console.log("The app is listening in PORT : ", PORT);
});