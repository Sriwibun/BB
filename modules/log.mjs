const log = function (req, res, next) {
    console.log(`Request: ${Date.now()}|${req.method}|${req.url}`);
    
    next();

}

export default log;