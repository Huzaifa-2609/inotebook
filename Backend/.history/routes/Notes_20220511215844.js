const express= require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
//GEt all the notes using :GET "/api/auth/getuser"
router.get("/fetchallnotes", (req,res)=>{
    
    res.json([])
})
module.exports = router;
