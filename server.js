const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App is listening at http://%s:%s', host, port);
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))