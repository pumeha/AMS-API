const express = require("express");
const users = require('./routes/users');
const visitors = require('./routes/visitors');

const app = express();
app.use(express.json());

app.use('/ams/api',[users,visitors]);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/ams`);
}).on('error',error =>{
    console.log({error: error.message});
    
});

