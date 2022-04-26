const router = require("express").Router();
const res = require("express/lib/response");
const userControllter = require("../controller/user.js");
const verifyUser = require('../middlewares/userAthenticator')

router.post("/createUser",verifyUser,userControllter.createUser)

router.post("/login",userControllter.userLogin)

module.exports = router