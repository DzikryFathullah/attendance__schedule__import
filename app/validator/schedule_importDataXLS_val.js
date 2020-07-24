const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    key         : Joi.string().required(),
    data        : Joi.array().items(Joi.object({
        employee_id: Joi.string().pattern(new RegExp('^[0-9 ]*$')),
        b: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        c: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        d: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        e: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        f: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        g: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        h: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        i: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        j: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        k: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        l: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        m: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        n: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        o: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        p: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        q: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        r: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        s: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        t: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        u: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        v: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        w: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        x: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        y: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        z: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        aa: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        ab: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        ac: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
        ad: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')).allow('', null),
        ae: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')).allow('', null),
        af: Joi.string().min(1).max(100).pattern(new RegExp('^[a-zA-Z0-9 ]*$')).allow('', null),
        date1: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date2: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date3: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date4: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date5: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date6: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date7: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date8: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date9: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date10: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date11: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date12: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date13: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date14: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date15: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date16: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date17: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date18: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date19: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date20: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date21: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date22: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date23: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date24: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date25: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date26: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date27: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date28: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')),
        date29: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')).allow('', null),
        date30: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')).allow('', null),
        date31: Joi.string().min(10).max(10).pattern(new RegExp('^[a-zA-Z0-9 -]*$')).allow('', null)
    })),
    department  : Joi.array().items(Joi.number())
});

module.exports = async (data, callback) => {
    try {
        let res = await schema.validateAsync(data);
        return callback(null, res);
    } catch (error) {
        // console.log(error.details, '==== lurr');
        return callback(true, 'Your input incorrect, please check again.');
    }
}