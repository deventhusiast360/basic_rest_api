const express =require("express");
const router = express.Router();

//import { PrismaClient } from '@prisma/client'
const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();

// import { Router } from "express";

//const router=Router();



router.get("/", async (req,res)=>{
   //console.log(router);
   const allTweets=await prisma.tweet.findMany();
   res.json(allTweets);
})

router.get("/:id",async (req,res)=>{
   const {id}=req.params;
   const showTweet = await prisma.tweet.findUnique({where:{id:Number(id)}});

   if(!showTweet){
    return res.status(404).json({error:"Tweet not found"});
   }

   res.json(showTweet);
})

router.post("/",async (req,res)=>{
   const {content,image,userId}=req.body;
   try {
       const creation_result=await prisma.tweet.create({
           data:{
               content,
               image,
               userId   //TODO based on the authentication/user
           }
       })
       res.status(201).json(creation_result);
       
   } catch (e) {
       res.status(409).json({error:"username not found"});
   }
   
})

// router.put("/:id",async (req,res)=>{
//    const {id}=req.params;
//    const {bio,image,name}=req.body;
//    try {
//        const updateResult=await prisma.user.update({
//            where:{id:Number(id)},
//            data:{
//                bio,
//                name,
//                image
//            }
       
//        })
//        res.status(200).json(updateResult);
//    } catch (e) {
//        res.status(404).json({
//            error:"user not found"
//        })
//    }
// })


router.delete("/:id",async(req,res)=>{
   const {id} = req.params;
   const deleteResult=await prisma.tweet.delete({
       where:{id:Number(id)},

   });
   res.sendStatus(204);

}) 

module.exports = router;