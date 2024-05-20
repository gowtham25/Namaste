const express = require('express');
const app = express();

let waitingClients = [];
let data = 'Initial data';

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/getData', (req, res) => {
    if(data !== req.query.lastData) {
        res.send({data});
    } else {
        waitingClients.push(res);
    }
})

app.get('/updateData', (req, res) => {
   data =  req.query.data
   while(waitingClients.length > 0) {
    const client = waitingClients.pop();
    client.json({data});
   }
})

const port = process.env.PORT || 5011;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})