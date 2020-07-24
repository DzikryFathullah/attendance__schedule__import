const database = require('../connection/mysql');
const config   = require('../config.js');

module.exports = (data, callback) => {
    let poin = '';
    data.map((value,index) => {
        let dataValue = ((Object.values(value)).slice(3));
        dataValue.filter(( datum, index) => {
            dataValue[index] = `"${datum}"` 
        });
        dataValue.join(',');
        poin = poin + `(${dataValue})`;
        if (index !== data.length -1) poin = poin + ',';
    });
    database.query(
        `CALL insert_att_schedule_temp_update(?)` ,
        [poin], 
		(err, res) => {
			if(err) return callback(true, err.sqlMessage);
			return callback(null, res);
	});
};
