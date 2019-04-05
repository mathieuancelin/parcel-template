const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const mode = process.env.MODE || 'prod';

const views = {};

function serveIndex(req, res) {
  const filePath = path.resolve('./src/views/index.html');
  let view = views[filePath];
  if (!view) {
    view = fs.readFileSync(filePath).toString('utf8');
  }
  view = view
    .replace('$jsurl', mode === 'prod' ? '/dist/client.min.js' : 'http://localhost:3000/client.js')
    .replace('$cssurl', mode === 'prod' ? '/dist/client.min.css' : 'http://localhost:3000/client.css');
  res.type('html').send(view);
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD');
  res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
  next();
});

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));
app.get('/', serveIndex);
app.get('/index.html', serveIndex);

app.options('/*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD');
  res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
  res.send('');
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send({ error: err.message })
  } else {
    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD');
      res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
      next();
    } catch(e) {
      res.status(500).send({ error: e.message })
    }
  }
});

app.listen(port, () => {
  console.log(`parcel-template listening on port ${port}!`);
});