const async = require('async');
const database = require('../connection/mysql');
const config = require('../config.js');


module.exports = async (data, callback) => {

	/**
	 * Algorithm delete
	 * 0. init variable
	 * 1. get data to table
	 */

	// 0. init variable
	const data_value = data.data;
	let result_array = [];


	// 2. check id in table
	const get_data = (data_val, procedureCallback) => {
		database.query('CALL ' + config.procedure.view_emp_by_id + '(?)', [
			data_val.employee_id,
		], (err, res) => {
			try {
				if (res[0][0].status == 'error') {
					return procedureCallback(`Please check data employee "${data_val.employee_id}"`);
				} else {
					// array push disini...
					result_array.push({
						...data_val,
						emp_nm: res[1][0].employee,
						department: res[1][0].department,
					});
					return procedureCallback();
				}
			} catch (error) {
				return procedureCallback('Please check your data and try again.');
			}
		});
	}

	try {
		await async.each(data_value, get_data);
		return callback(null, result_array);
	} catch (error) {
		return callback(true, error);
	}
};
