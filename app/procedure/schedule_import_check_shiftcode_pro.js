const async = require('async');
const database = require('../connection/mysql');
const config = require('../config.js');


module.exports = async (data, callback) => {

	/**
	 * Algorithm delete
	 * 0. init array id split
	 * 1. Check id is string
	 * 2. Check id is available in table
	 */

    // 0. init variable
    const id_array = data.shiftcode;

    // 1. Check id is string
    const check_id_is_string = (value) => {
        if (!value) {
            return callback(true, 'Your input incorrect, please check again.');
        }
        let val = String(value);
        return val;
    }

    if (!id_array.every(str => check_id_is_string(str)))
        return callback(true, 'Your input incorrect, please check again.');


    // 2. check id in table
    const check_by_id = (id, procedureCallback) => {
        database.query('CALL ' + config.procedure.check_shiftcode + '(?)', [id], (err, res) => {
            // console.log(err, res, '==== LURRRRR');
            try {
                if (res[0][0].status == 'error') {
                    return procedureCallback('Shiftcode "' + id + '" not found.');
                } else {
                    return procedureCallback();
                }
            } catch (error) {
                return procedureCallback('Shiftcode Not Found.');
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
