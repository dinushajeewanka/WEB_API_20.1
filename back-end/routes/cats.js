const router = require("express").Router();
const res = require("express/lib/response");
const catControllter = require("../controller/cat.js")
const verifyUser = require("../middlewares/userAthenticator")

router.post("/createcat",verifyUser,catControllter.createCat)

router.delete("/deletecat",verifyUser,catControllter.deleteCat)

router.put("/updatecat",verifyUser, catControllter.updateCat)

router.get("/getcat",verifyUser, catControllter.getAllCats)

router.get("/getcatByAdminId", verifyUser,catControllter.getcatByAdminId)

module.exports = router