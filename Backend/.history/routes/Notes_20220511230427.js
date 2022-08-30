const express= require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const {
    body,
    validationResult
} = require('express-validator');

//Route 1: Get all the notes using :GET "/api/auth/getuser" Login required
router.get("/fetchallnotes",fetchUser, async(req,res)=>{
    try{
        const  notes = await Notes.find({user:req.user.id})
        res.json(notes);
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("some error occured")
    }
}
)


//Route 2: add a new note using :GET "/api/auth/addnote" Login required
router.post("/addnote",fetchUser,
[
    body('title', 'Enter a valid title').isLength({
        min: 3
    }),
    body('description', "Enter a valid description").isLength({
        min: 5
    }),

], async(req,res)=>{
    try{

    
    const {title, description, tag}=req.body;
    //If there are Errors Return bad Request and Error Message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const Note= new Note({
        title,
        description,
        tag,
        user:user.id
    })
    const savedNote= Note.save();
    res.send(savedNote);

    const  notes = await Notes.find({user:req.user.id})
    res.json(notes);
}catch(error){
    console.error(error.message)
    res.status(500).send("some error occured") 
}
})


module.exports = router;
