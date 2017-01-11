const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost/todos', ['lists', 'todo']);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.put('/todo', (req, res)=>{
  let schema = {
    title: req.body.title,
    id: req.body.id,
    complete: req.body.complete
  };

  db.todo.insert(schema, (err, docs) => {
    // err ? res.json({error: err, data: null}) : res.json({error: null, data: docs});
    return res.json({error: err, data: docs});
  });

});

app.get('/todo', (req, res)=>{
  db.todo.find({}, {}, (err, docs)=> err? res.json({error: err, todos:null}) : res.json({error: null, todos: docs}) );
});

app.patch('/todo', (req, res)=>{
  let schema ={
    id: req.body.id,
    title: req.body.title,
    complete: req.body.complete
  };

  db.todo.update({id: schema.id}, {$set: schema}, (err, doc)=>{
    err ? res.json({error: err, data: null}) : res.json({error: null, data: doc});
  });
});

app.delete('/todo', (req, res)=>{
  db.todo.remove({id: req.query.id},{multi: true}, (err, doc)=>{
    err ? res.json({error: err, data: null}) : res.json({error: null, data: doc});
  });
});

server.listen(PORT, err=>{
  console.log('listen on *:',PORT);
});
