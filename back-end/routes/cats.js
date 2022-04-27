const router = require("express").Router();
const res = require("express/lib/response");
const catControllter = require("../controller/cat.js")
const verifyUser = require("../middlewares/userAthenticator")

router.post("/createcat",catControllter.createCat)

router.delete("/deletecat",catControllter.deleteCat)

router.put("/updatecat", catControllter.updateCat)

router.get("/getcat", catControllter.getAllCats)

router.get("/getcatByAdminId", catControllter.getcatByAdminId)

module.exports = router