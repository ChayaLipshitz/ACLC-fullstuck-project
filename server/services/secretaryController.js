const db = require('./db')


function getSingle(secretaryId) {
    let result = db.query(`select * from secretary where id = ${secretaryId}`);
    console.log(secretaryId)
    console.log(result);
    return result;
}



module.exports = {
 getSingle
}