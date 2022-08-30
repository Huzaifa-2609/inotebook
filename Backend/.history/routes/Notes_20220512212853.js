const express= require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const {
    body,
    validationResult
} = require('express-validator');

//Route 1: Get all the notes using :GET "/api/Notes/getuser" Login required
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

    const Note= new Notes({
        user: req.user.id,
        title,
        description,
        tag,
    })
    const savedNote= await Note.save();
    res.send(savedNote);


}catch(error){
    console.error(error)
    res.status(500).send("some error occured") 
}
})
//Route 3: updating an existing note using :PUT "/api/auth/updatenote" Login required

router.put("/updatenote/:id",fetchUser,
 async(req,res)=>{
     const {title, description, tag}= req.body;
     //Create a new note object
     try{
     const newNote={};
     if(title)
     {
        newNote.title=title;
     }
     if(description)
     {
        newNote.description=description;
     }
     if(tag)
     {
        newNote.tag=tag;
     }

     //Find the note to be updated and update it
     let note = await Notes.findById(req.params.id); 
     if(!note){
         return res.status(404).send("Not Found")
        }

    // for validating the user accessing his own notes    
     if(note.user.toString()!== req.user.id)
     {
         return res.status(400).send("Not Allowed");
     }
     
     note= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
     res.json(note);
    }catch(error){
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})
//Route 3: updating an existing note using :DELETE "/api/auth/deletenote" Login required
router.delete("/deletenote/:id",fetchUser,
 async(req,res)=>{
    // const {title, description, tag}= req.body;

    //Find the note to be deleted and delete it
    try{

    
    let note = await Notes.findById(req.params.id); 
    if(!note){
        return res.status(404).send("Not Found")
       }

   // Allow deletion only is user owns the note    
    if(note.user.toString()!== req.user.id)
    {
        return res.status(400).send("Not Allowed");
    }
    
    note= await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted"});
}catch(error){
    console.error(error.message)
        res.status(500).send("some error occured")
}
 })
module.exports = router;
