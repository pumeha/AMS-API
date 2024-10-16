const express = require("express");
const users = require('./routes/users');
const visitors = require('./routes/visitors');
const survey = require('./routes/survey');

const app = express();
app.use(express.json());

const  currentDate = new Date();
let hours = currentDate.getHours();
const AmPm = hours >= 12 ? 'PM' : 'AM';
//convert hours to 12-hour format
hours = hours % 12 || 12;
const time = hours + ':'+ String(currentDate.getMinutes()).padStart(2, '0') + ' ' + AmPm;

console.log(time);

app.use('/ams/api',[users,visitors,survey]);

const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/ams`);
}).on('error',error =>{
    console.log({error: error.message});
    
});

