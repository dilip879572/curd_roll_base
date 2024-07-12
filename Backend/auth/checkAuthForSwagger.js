exports.swaggerAuth = function (req, res, next) {
    console.log(req.params.user);
    if (!req.params.user || req.params.user === 'undefined') {
        return res.end('Invalid request..');
    }
    else {
        if (req.params.user == 'bp') {
            next();
        }
        else {
            return res.end('Invalid request.');
        }

    }
}