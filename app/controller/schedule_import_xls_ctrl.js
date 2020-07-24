const async 		= require('async');
const validator 	= require('../validator');
const procedure 	= require('../procedure');

module.exports = (req, callback) => {
	var loginDurations = null
	async.waterfall([
		(next) => {
			/**
			 * Validator check params from client 
			 * @callback Requester~requestCallback
			 * @param {string} req
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} value	The callback that handles the response succes.
		 	 */
            let val = {
                ...req.body,
                ...req.query
            };
			validator.schedule_import_xls_val(val, (err, value) => {
				if(err) return next(true, value);
				return next(null, value);
			});	
        },
        (value, next) => {
			/**
			 * 0. check valid date
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            // check is valid date
            const isValidDate = (dateString) => {
                var regEx = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateString.match(regEx)) return false;  // Invalid format
                var d = new Date(dateString);
                var dNum = d.getTime();
                if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
                return d.toISOString().slice(0, 10) === dateString;
            }

            try {
                for (let i = 0; i < value.data.length; i++) {
                    for (let j = 0; j < 31; j++) {
                        if (value.data[i]['date' + (j + 1)]) {
                            if (isValidDate(value.data[i]['date' + (j + 1)]) == false) {
                                // return error this date
                                let date_message = `Format date "${value.data[i]['date' + (j + 1)]}" is incorrect. Please check and try again.`;
                                return next(true, date_message);
                            }
                        }
                    }
                    // if last looping then send data to next
                    if ((i + 1) == value.data.length) {
                        return next(null, value);
                    }
                }
            } catch (error) {
                return next(true, 'Please check and try again.');
            }
        },
        (value, next) => {
			/**
			 * 1. check employee id sudah ada di master emp
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            let emp_id = [];
            value.data.map((a, index) => emp_id[index] = value.data[index].employee_id);
            procedure.schedule_import_check_emp_pro(emp_id, (err, res) => {
                if (err) return next(true, res);
                try {
                    if (res[0][0].status == 'Error') return next(true, res[0][0].message);
                    return next(null, value);
                } catch (error) {
                    return next(true, 'Please check and try again.')
                }
            });
        },
		(value, next) => {
			/**
			 * 2. cek shiftcode hanya yg terdaftar di master workshift
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            let emp_id = [];
            let shiftcode = [];
            value.data.map((a, index) => emp_id[index] = value.data[index].employee_id);
            value.data.map((a, index) => {
                shiftcode[index] = [
                    value.data[index].b,
                    value.data[index].c,
                    value.data[index].d,
                    value.data[index].e,
                    value.data[index].f,
                    value.data[index].g,
                    value.data[index].h,
                    value.data[index].i,
                    value.data[index].j,
                    value.data[index].k,
                    value.data[index].l,
                    value.data[index].m,
                    value.data[index].n,
                    value.data[index].o,
                    value.data[index].p,
                    value.data[index].q,
                    value.data[index].r,
                    value.data[index].s,
                    value.data[index].t,
                    value.data[index].u,
                    value.data[index].v,
                    value.data[index].w,
                    value.data[index].x,
                    value.data[index].y,
                    value.data[index].z,
                    value.data[index].aa,
                    value.data[index].ab,
                    value.data[index].ac,
                    value.data[index].ad,
                    value.data[index].ae,
                    value.data[index].af,
                ];
                shiftcode[index] = [...new Set(shiftcode[index])].filter(el => el != null && el != '');
                return true;
            });
            let newShiftcode = [];
            shiftcode.map((el, index) => newShiftcode = [...newShiftcode, ...shiftcode[index]]);
            let filterShiftcode = [...new Set(newShiftcode)];

            procedure.schedule_import_check_shiftcode_pro({ shiftcode: filterShiftcode }, (err, res) => {
                if (err) return next(true, res);
                try {
                    if (res[0][0].status == 'Error') return next(true, res[0][0].message);
                    return next(null, { ...value, shiftcode_filter: filterShiftcode });
                } catch (error) {
                    return next(true, 'Please check and try again.')
                }
            });
        },
        (value, next) => {
			/**
			 * Get shiftcode data
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            let filterShiftcode = value.shiftcode_filter;
            procedure.schedule_import_get_shiftcode_pro({ shiftcode: filterShiftcode }, (err, res) => {
                if (err) return next(true, res);
                try {
                    return next(null, { ...value, shiftcode_filter: filterShiftcode, workshift_data: res });
                } catch (error) {
                    return next(true, 'Please check and try again.')
                }
            });
        },
        (value, next) => {
			/**
			 * merge & match data
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            let init_column = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af'];
            let ready_insert = [];

            try {
                let shift_id = null;
                for (let i = 0; i < value.data.length; i++) {
                    init_column.map((el, index) => {
                        if (value.data[i][el]) {
                            shift_id = value.workshift_data.find(element => element.shift_code == value.data[i][el]);
                            ready_insert.push({
                                alfabet: el,
                                value_alfabet: value.data[i][el],
                                date: 'date' + String((index + 1)),
                                value_date: value.data[i]['date' + String((index + 1))],
                                shift_id: shift_id.shift_id,
                                employee_id: value.data[i].employee_id
                            });
                        }
                    });
                    // if last looping then send data to next
                    if ((i + 1) == value.data.length) {
                        return next(null, { ...value, ready_insert: ready_insert });
                    }
                }
            } catch (error) {
                return next(true, 'Please check and try again.')
            }
        },
        (value, next) => {
			/**
			 * Insert to att_schedule
			 * 
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            procedure.schedule_import_insert_att_schedule_temp_pro(value.ready_insert, (err, res) => {
                if (err) return next(true, res);
                try {
                    return next(null, res);
                } catch (error) {
                    return next(true, 'Please check and try again.')
                }
            });
        },
	],
	(error, response) => {
		/**
		 * handle error
		 */
		if(error) {
			let data = {
				header: {
					status 	: 500,
					message : response,
					access:  {
						create	: 1,
						read	: 1,
						update	: 1,
						delete	: 1
					}
				},
				data: [],
			};
			return callback(data);
		};

		let data = {
			header: {
				status 	: 200,
                message: 'Sucessfully import new schedule',
				access:  {
					create	: 1,
					read	: 1,
					update	: 1,
					delete	: 1
				}
			},
			data: null,
		};
		return callback(data);
	});
};
