const ENV = process.env;

module.exports = {

	/**
	 * service connection
	 * 
	 * @param	{string}	NODE_PORT
	 * @param	{string}	NODE_HOST
	 */
	port 		: ENV.NODE_PORT || '2301',
	ip 			: ENV.NODE_HOST || '0.0.0.0',
	_main_url	: 'http://192.168.1.12:4255',
	_pages		: 58 || 57, // non_it dan local_expat


	/**
	 * mysql database connection
	 * 
	 * @param	{string}	DB_HOST
	 * @param	{string}	DB_PORT
	 * @param	{string}	DB_USER
	 * @param	{string}	DB_PASSWORD
	 */
	mysql 	: {
		host 		: ENV.DB_HOST 		|| "192.168.1.12", 
		port 		: ENV.DB_PORT 		|| "3306",
		user 		: ENV.DB_USER 		|| "root",
		password	: ENV.DB_PASSWORD 	|| "asdf1234*",
		database 	: 'db_hrms_prod',
	},

	/**
	 * PROCEDURE NAME
	 * this is procedure name where i used in this service.
	 */
	procedure: {
		view_department1: 'view_department1',
		check_emp_by_id: 'check_emp_by_id',
		check_emp_n_department: 'check_emp_n_department',
		check_shiftcode: 'check_shiftcode',
		insert_att_schedule_temp: 'insert_att_schedule_temp',
		view_emp_by_id: 'view_emp_by_id',
		view_workshift_fixed_schedule_1: 'view_workshift_fixed_schedule_1',
		insert_att_schedule: 'insert_att_schedule',
	}
	
};



