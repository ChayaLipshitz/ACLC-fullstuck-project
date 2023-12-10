const db = require('./db')


async function getData(id) {
    let result = db.query(`select* from schedules where studentId = ${id};`)
    console.log(result);
    return result;
}

async function postData(id, item) {
    myQuery = `insert into schedules values('${item.id}',${id},'${JSON.stringify(item)}');`
    console.log("the query is: ",myQuery);
    let result = db.query(`insert into schedules values('${item.id}',${id},'${JSON.stringify(item)}');`)
    //let result = db.query(`insert into schedules values('${item.id}',${id},'${item.start}' , '${item.end}' , '${item.title}', ${item.isAllDay});`)
    console.log(result);
    return result;
    
}

async function putData(id, item) {
    myQuery = `UPDATE schedules
    SET data = '${JSON.stringify(item)}'
    WHERE studentId = ${id} and id = '${item.id}'`
    console.log("the query is: ",myQuery);
    let result = db.query(`UPDATE schedules
    SET data = '${JSON.stringify(item)}'
    WHERE studentId = ${id} and id = '${item.id}'`)
    console.log(result);
    return result;
}

async function deleteData(id, item) {
    myQuery = `DELETE FROM schedules WHERE id = '${item.id}';`
    console.log("the query is:  ",myQuery);    
    let result = db.query(`DELETE FROM schedules WHERE id = '${item.id}';`)
    console.log(result);
    return result;
}

module.exports = {
    postData, putData, getData, deleteData
}