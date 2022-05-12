import {fetchFull} from "./fetcher";

const express = require('express')
const app = express()

const SERVER_PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    const data = await fetchFull();
    res.send(data)
})

// start the Express server
app.listen( SERVER_PORT, () => {
    console.log( `Server started at http://localhost:${ SERVER_PORT }` );
});
