const axios     = require('axios');
const access 	= false;
const async     = require('async');
const config 	= require('../config');
let _pages    = config._pages;
const _main_url = config._main_url;

module.exports = (req, res, next) => {
    let action;

    if (req.method === 'GET') {
        action = 'read';
    } else if (req.method === 'POST') {
        action = 'create';
    } else if (req.method === 'PUT') {
        action = 'edit';
    } else if (req.method === 'DELETE') {
        action = 'destroy';
    }

    async.waterfall(
        [
            (cb) => {
                axios({
                    method: 'POST',
                    url: `${_main_url}/api/authorization?key=${req.query.key}`,
                    headers: { Authorization: `Bearer ${req.query.key}` },
                    data: {
                        page: _pages,
                        action,
                    },
                })
                    .then(function(response) {
                        if (response.data.header.status !== 200) {
                            return cb(response.data, null);
                        }
                        return cb(null, response.data);
                    })
                    .catch(function(error) {
						console.log(error)
                        return cb({
                            header: {
                                message: 'Access Denied.',
                                access: null,
                                status: 500,
                            },
                            data: null,
                        });
                    });
            },
        ],
        (err, data) => {
            /**
             * handle error
             */
            if (err) {
                const { status } = err.header;
                return res.status(status).json(err);
            }
            req.param.access = data;
            return next();
        },
    );
};
/*
module.exports = (req, res, next) => {
	var loginDurations = null
	
	if(req.method == "GET"){
		action = 'read';
	}else if(req.method == "POST"){
		action = 'create';
	}else if(req.method == "PUT"){
		action = 'edit';
	}else if(req.method == "DELETE"){
		action = 'delete';
	}
    
	async.waterfall([
		(cb)=>{
			let res_data = { header : { message : "Access Deneid.", access : null, status : 500 }, data : null };
			
			axios({
			  method: 'POST',
			  url: 'http://192.168.1.12:8080/jwt_decode',
			  headers: {'Authorization':"Bearer "+req.query.key},
			  data: {}
			}).then(function (response) {
					if(response.data.status != 200){
						return cb(res_data,null);
					}else{
						return cb(null, response.data.data);
					}
					
			}).catch(function (error) {
				console.log(error)
				return res.status(403).json(res_data);
			});
		},
		(value, cb) => {

			let res_data = { header : { message : "Access Deneid.", access : null, status : 500 }, data : null };

			if(value.local_it === 3){
				_pages = _pages[1];
			}else{
				_pages = _pages[0];
			}
			axios({
			  method: 'POST',
			  url: _main_url+'/api/authorization?key='+req.query.key,
			  headers: {'Authorization':"Bearer "+req.query.key},
			  data: {
			    page: _pages,
			    action: action
			  }
			}).then(function (response) {
					if(response.data.header.status != 200){
						return cb(response.data,null);
					}else{
						return cb(null, response.data);
					}
					
			}).catch(function (error) {
				console.log(2, error.toString());
				cb(res_data, null);
			});
		}
	],(err, data) => {
		/**
		 * handle error
		 */
		// if(err) {
			// var status 	= err.header.status;
			// var data 	= err;
			// return res.status(status).json(err);
		// }else{
			// req.param.access = data;
			// next();
		// }
		// 
// 
	// });
// };
