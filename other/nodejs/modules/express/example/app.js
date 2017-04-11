const express = require('express');
const routes = require('./routes');

let app = express();
app.use(routes);

app.listen(80);
