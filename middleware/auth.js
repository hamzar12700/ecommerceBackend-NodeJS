import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';




export const authUser = async(req,res,next)=>{
    const {token} = req.headers;

    if (!token) {
    return res.json({success : false , message : "Not Authorized Login Again"})     
    }


    try {
        const token_decode = jwt.verify(token , process.env.TOKEN)

        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})     
    }
}