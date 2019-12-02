require('dotenv').config(); //to help hide our token signatures
let express = require('express');
let app = express();

app.listen(3000, function() {
    console.log("Hello from Port 3000");
})