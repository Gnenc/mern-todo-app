const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:5000"]}));

const todoRoutes = require('./routes/todoOperationRoutes');

app.use('/api/v1/todos', todoRoutes);

const buildPath = path.join(__dirname, '../../build');

app.use(express.static(buildPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;