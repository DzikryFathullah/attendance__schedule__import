/** @format */

const express       = require('express');
const app           = express();
const router        = express.Router();
const controller    = require('../../controller');
const middle		= require('../../middleware');
const path       	= require('path');

module.exports = app => {
    
    /**
	 * api/attendance/schedule-import/api_permission
	 * get schedule import
	 *
	 * @method 	{GET}
	 * @param	{string}	query.key
	 */
	app.get('/api/attendance/schedule-import/api_permission', middle.permission, (req, res) => {
			controller.schedule_read_ctrl(req, message => {
				message.header.access = req.param.access.data.access;
				res.status(message.header.status);
				res.send(message);
			});
		});
	
	/**
	 * api/attendance/schedule-import/getfile
	 * get file import example
	 *
	 * @method 	{GET}
	 * @param	{string}	query.key
	 */
	app.get('/api/attendance/schedule-import/getfile', middle.permission, (req, res) => {
			controller.schedule_get_file_ctrl(req, message => {
				message.header.access = req.param.access.data.access;
				res.status(message.header.status);
				if (message.header.status == 200) {
					let fileLocation = path.join('./app/assets', 'xls_schedule.xlsx');
					res.download(fileLocation, 'xls_schedule.xlsx'); 
				} else {
					res.send(message);
				}
			});
		});

	/**
	 * api/attendance/schedule-import/importDataXLS
	 * importDataXLS
	 *
	 * @method 	{POST}
	 * @param	{string}	query.key
	 * @param	{array}		body.data
	 * @param	{array}		body.department
	*/
	app.post('/api/attendance/schedule-import/importDataXLS', middle.permission, (req, res) => {
			controller.schedule_importDataXLS_ctrl(req, message => {
				message.header.access = req.param.access.data.access;
				res.status(message.header.status);
				res.send(message);
			});
		});

	
 	/* *
	 * api/attendance/schedule/indexFixShift
	 * get indexFixShift
	 *
	 * @method 	{GET}
	 * @param	{string}	query.key
	 */
	app.get('/api/attendance/schedule/indexFixShift', middle.permission, (req, res) => {
			controller.schedule_indexFixShift_ctrl(req, message => {
				message.header.access[3] = req.param.access.data.access;
				res.status(message.header.status);
				res.send(message);
			});
		});
	
	
	/**
	 * api/attendance/schedule-import/xls
	 * xls
	 *
	 * @method 	{POST}
	 * @param	{string}	query.key
	 * @param	{array}		body.data
	 * @param	{array}		body.department
	*/
	app.post('/api/attendance/schedule-import/xls', middle.permission, (req, res) => {
			controller.schedule_import_xls_ctrl(req, message => {
				message.header.access = req.param.access.data.access;
				res.status(message.header.status);
				res.send(message);
			});
		});
    
	
	// handle if page not found
	app.use(function (req, res, next) {
		if (req.accepts('json')) {
			res.status(405);
			res.send({
                header: {
					message: 'Sorry, your request is not allowed',
					status: 405
                }
			});
			return;
		}
	});

};
