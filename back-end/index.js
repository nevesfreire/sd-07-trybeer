const express = require('express');
const cors = require('cors');

const { user, auth } = require('./resources');

const app = express();
app.use(cors());
app.use(express.json());

app.use(user.route);
app.use(auth.route);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Trybeer API ON and listen at ${PORT}!`);
});
