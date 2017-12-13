'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import fetch from "isomorphic-fetch";
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
  const HTML = renderView({
    title: 'My Webtask View',
    body: '<h1>Simple webtask view</h1>'
  });
  
  fetch("https://google.com")
  .then(r => r.text())
  .then((data)=>{
      res.set('Content-Type', 'text/html');
      res.status(200).send(data);  
  })

  // res.set('Content-Type', 'text/html');
  // res.status(200).send(HTML);
});

module.exports = fromExpress(app);

function renderView(locals) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${locals.title}</title>
    </head>

    <body>
      ${locals.body}
    </body>
    </html>
  `;
}
