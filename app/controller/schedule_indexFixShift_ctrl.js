const async         = require('async');
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
			validator.schedule_indexFixShift_val(req.query, (err, value) => {
				if(err) return next(true, value);

				return next(null, value);
			});	
		},
		(value, next) => {
			/**
			 * procedure indexFixShift
			 * @callback Requester~requestCallback
			 * @param {string} value
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} res		The callback that handles the response succes.
			 */
            procedure.schedule_indexFixShift_pro(value, (err, res) => {
				if(err) return next(true, res);
				try {
					return next(null, res[0])
				} catch (error) {
					return next(true, res);
				}
			});
		}
	],
	(error, response) => {
		/**
		 * handle error
		 */
		if(error) {
			let data = {
                header: {
                    status: 500,
                    message: response,
                    access: {
                        create: 1,
                        read: 1,
                        update: 1,
                        delete: 1
                    }
                },
                data: null,
			};
			return callback(data);
		};


		let data = {
			header: {
				status 	: 200,
				message : 'Success.',
				access:  [
                    "Access Granted",
                    200,
                    null
                ]
			},
			data: response,
		};
		return callback(data);
	});
};
