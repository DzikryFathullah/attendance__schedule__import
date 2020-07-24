const async 		= require('async');
const fs 			= require('fs');

module.exports = (req, callback) => {
	var loginDurations = null
	async.waterfall([
		(next) => {
			/**
			 * check exiting file 
			 * @callback Requester~requestCallback
			 * @param {string} req
			 * @param {string} err		The callback that handles the response error.
			 * @param {string} value	The callback that handles the response succes.
		 	 */
			let path = './app/assets/xls_schedule.xlsx';
			try {
				if (fs.existsSync(path)) {
					//file exists
					return next(null, 'Success');
				} else {
					return next(true, 'File not found');
				}
			} catch (err) {
				return next(true, 'File not found');
			}
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
				access:  {
					create	: 1,
					read	: 1,
					update	: 1,
					delete	: 1
				}
			},
			data: response,
		};
		return callback(data);
	});
};
