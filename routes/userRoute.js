 const express =require("express");
 const router = express.Router();

//import { PrismaClient } from '@prisma/client'
const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();

// import { Router } from "express";

//const router=Router();



router.get("/", async (req,res)=>{
    //console.log(router);
    const allUsers=await prisma.user.findMany();
    res.json(allUsers);
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const showUser = await prisma.user.findUnique({where:{id:Number(id)}});
    res.json(showUser);
})

router.post("/",async (req,res)=>{
    const {email,name,username}=req.body;
    console.log(`Email : ${email}\nName : ${name}\nUsername : ${username}`);
    try {
        const creation_result=await prisma.user.create({
            data:{
                email,
                name,
                username,
                bio:"I am a New user",
            }
        })
        res.status(201).json(creation_result);
        
    } catch (e) {
        res.status(409).json({error:"username already exists"});
    }
    
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    const {bio,image,name}=req.body;
    try {
        const updateResult=await prisma.user.update({
            where:{id:Number(id)},
            data:{
                bio,
                name,
                image
            }
        
        })
        res.status(200).json(updateResult);
    } catch (e) {
        res.status(404).json({
            error:"user not found"
        })
    }
})


router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    const deleteResult=await prisma.user.delete({
        where:{id:Number(id)},

    });
    res.sendStatus(204);

})

module.exports = router;