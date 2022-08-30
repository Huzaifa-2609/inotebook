const express= require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const Notes = require("../models/Notes");

//Route 1: Get all the notes using :GET "/api/auth/getuser" Login required
router.get("/fetchallnotes",fetchUser, async(req,res)=>{
    const  notes = await Notes.find({user:req.user.id})
    res.json(notes);
})

//Route 1: Get all the notes using :GET "/api/auth/getuser" Login required
router.get("/fetchallnotes",fetchUser, async(req,res)=>{
    const  notes = await Notes.find({user:req.user.id})
    res.json(notes);
})
module.exports = router;
