const async = require('async');
const database = require('../connection/mysql');
const config = require('../config.js');


module.exports = async (data, callback) => {

	/**
	 * Algorithm delete
	 * 0. init array id split
	 * 1. Check id is int
	 * 2. Check id is available in table
	 */

    // 0. init variable
    const id_array = data.emp;
    const id_department = data.department;

    // 1. Check id is int
    const check_id_is_int = (value) => {
        if (isNaN(value)) {
            return callback(true, 'Your input incorrect, please check again.');
        }
        let val = parseInt(value);
        return val;
    }

    if (!id_array.every(str => check_id_is_int(str)))
        return callback(true, 'Your input incorrect, please check again.');


    // 2. check id in table
    const check_by_id = (id, procedureCallback) => {
        database.query('CALL ' + config.procedure.check_emp_n_department + '(?,?)', [id, id_department], (err, res) => {
            try {
                if (res[0][0].status == 'error') {
                    return procedureCallback('Employee with id "' + id + '" not found.');
                } else {
                    return procedureCallback();
                }
            } catch (error) {
                return procedureCallback('Employee Not Found.');
            }
        });
    }

    try {
        await async.each(id_array, check_by_id);
        return callback(null, 'Success');
    } catch (error) {
        return callback(true, error);
    }
};
