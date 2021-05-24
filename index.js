const { response } = require('express');
const express = require('express');

const app = express();
//GET-READ
app.get('/', (req, res) => {
    res.status(401).send("THis I s A get MEthod")
})
//POST-CREATE
app.post('/', (req, res) => {
    res.send("THis I s A POST MEthod")
})
//PUt-updatae modify whole
app.put('/', (req, res) => {
    res.send("THis I s A put MEthod")
})
//PATCH-Update /modify partially
app.patch('/', (req, res) => {
    res.send("THis I s A patch MEthod")
})
//Delete-delete
app.delete('/', (req, res) => {
    res.send("THis I s A delete MEthod")
})
app.listen(3000, () => {
    console.log("server started at port: 3000")
})

