const router = require("express").Router();
const res = require("express/lib/response");
const cat = require("../models/cat.js");

router.route("/createcat").post((req,res)=>{

    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const description= req.body.description;
    const features = req.body.features;
    const owner_name = req.body.owner_name;
    const owner_mobile = req.body.owner_mobile;
    const photo = req.body.photo;
    const adminId = req.body.adminId;

    const newCat = new cat({
        name,
        age,
        gender,
        description,
        features,
        owner_name,
        owner_mobile,
        photo,
        adminId
    });

    newCat.save().then(()=>{
        res.json("Your cat successfully added")
    }).catch((err)=>{
        console.log("Error : ",err);
        res.json("Cat added failed");

    });

})
router.route("/deletecat").delete((req,res)=>{

    const catId = req.query.catId

    cat.deleteOne({_id:catId}).then((data)=>{
        res.json("Cat remove successful")
    }).catch((err)=>{
        console.log("Error : ",err);
        res.json("Cat removing failed");

    })



})
router.route("/updatecat").put((req,res)=>{

    const catId = req.query.catId;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const description= req.body.description;
    const features = req.body.features;
    const owner_name = req.body.owner_name;
    const owner_mobile = req.body.owner_mobile;
    const photo = req.body.photo;

    cat.updateOne({_id:catId}, {
        name,
        age,
        gender,
        description,
        features,
        owner_name, 
        owner_mobile, 
        photo})
        .then((data)=>{
            console.log("data", data)
            res.json("Successfully Updated")

    }).catch((err)=>{
        console.log("Error : ",err);
        res.json("Cat updating failed");
    });

})


router.route("/getcat").get((req,res)=>{
    cat.find().then((cats)=>{
        res.json(cats)
    }).catch((err)=>{
        console.log("Error : ",err);
        res.json("Cat Fetching failed");

    })
})

router.route("/getcatByAdminId").get((req,res)=>{
    const adminId = req.query.adminId
    cat.find({ adminId }).then((cats)=>{
        res.json(cats)
    }).catch((err)=>{
        console.log("Error : ",err);
        res.json("Cat Fetching failed");

    })
})
module.exports = router