const db = require('./db')


async function getData(id) {
    let result = db.query(`select* from schedule where studentId = ${id};`)
    console.log(result);
    return result;
}

async function postData(id, item) {
    let result = db.query(`insert into schedule values('${item.id}',${id},'${JSON.stringify(item)}');`)
    //let result = db.query(`insert into schedule values('${item.id}',${id},'${item.start}' , '${item.end}' , '${item.title}', ${item.isAllDay});`)
    console.log(result);
    return result;
}

async function putData(id, item) {
    let result = db.query(`UPDATE schedule
    SET data = '${JSON.stringify(item)}'
    WHERE studentId = ${id} and id = '${item.id}'`)
    console.log(result);
    return result;
}

async function deleteData(id, item) {
    let result = db.query(`DELETE FROM schedule WHERE id = '${item.id}';`)
    console.log(result);
    return result;
}

module.exports = {
    postData, putData, getData, deleteData
}