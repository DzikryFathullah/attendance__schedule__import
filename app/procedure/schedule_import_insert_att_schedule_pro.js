const async = require('async');
const database = require('../connection/mysql');
const config = require('../config.js');


module.exports = async (data, callback) => {

	/**
	 * Algorithm delete
	 * 0. init variable
	 * 1. insert data to table
	 */

    // 0. init variable
    const data_value = data;


    // 2. check id in table
    const insert_data = (data_val, procedureCallback) => {
        database.query('CALL ' + config.procedure.insert_att_schedule + '(?,?,?)', [
            data_val.employee_id,
            data_val.value_date,
            data_val.shift_id,
        ], (err, res) => {
            try {
                if (res[0][0].status == 'error') {
                    return procedureCallback(`Please check data employee "${data_val.employee_id}", date = ${data_val.value_date} and shiftcode ${data_val.value_alfabet}.`);
                } else {
                    return procedureCallback();
                }
            } catch (error) {
                return procedureCallback('Please check your data and try again.');
            }
        });
    }

    try {
        await async.each(data_value, insert_data);
        return callback(null, 'Success');
    } catch (error) {
        return callback(true, error);
    }
};
