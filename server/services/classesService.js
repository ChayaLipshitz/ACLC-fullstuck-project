const db = require('./db')

async function getAll(){
    console.log("query");
    let result = await db.query('select className, classId from classes;');
    console.log(result);
    return result;
}



module.exports = {
   getAll
}