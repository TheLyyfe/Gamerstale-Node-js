const UserModel = require("../models/user")


let routeGuard = async (req,res,next)=> {
    let user = await UserModel.findOne({_id:req.session.userId})
    if (user) {
        next()
    } else{
        res.redirect('/main')
    }
}

module.exports = routeGuard  