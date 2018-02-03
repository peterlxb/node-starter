const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001
const app = express();

app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//     res.send("<h1>Hello World</h1>")
// });

app.listen(port, () =>  {
    console.log(`listening on *:${port}`);
});