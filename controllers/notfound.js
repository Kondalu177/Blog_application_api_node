const notfound = (req, res, next )=>{
    res.status(404).json({code:404, status:false, message:"Api Not Found"})
}

module.exports = notfound;