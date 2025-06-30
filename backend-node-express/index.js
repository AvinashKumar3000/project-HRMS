const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 5000;

app.listen(PORT, () => {
    console.log("The app is listening in PORT : ", PORT);
});