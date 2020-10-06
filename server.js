const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));

const server = app.listen(PORT);
