const patient = require('../models/patientModel')
const hospitalCount = require('../models/hospitalCount')
const user = require('../models/userModel')
const Jwt = require('jsonwebtoken')
const allhospital = require('../models/allHospitals')
const { findOne, updateOne } = require('../database/conn')


const addpatient=async(req,res)=>{
    try{
        const {fullName,gender,email,age,service,mobile,hospitalName} = req.body

        if(!fullName || !gender || !age || !service || !mobile || !hospitalName){
            return res.status(400).json({error: "Please provie all details"})
        }
        else{
            const newPatient = new patient({fullName,gender,email,age,service,mobile,hospitalName})
            const result = await newPatient.save()

            if(result) res.status(201).json({msg: 'Patient added succesfully!'})
            else res.status(500).json({error: 'somthing went wrong'})
        }
    }
    catch(e){
        return res.status(500).json({error: e})
    }
}

const plusHospital=async(req,res)=>{
    try{
        const {hospitalName} = req.body
        const user = await hospitalCount.findOne({name: hospitalName})

        if(!user) return res.status(404).json({error: "not found"})

        const newCount = user?.count + 1
        const updated = await hospitalCount.updateOne({name: user.name}, {count: newCount})

        if(updated) return res.status(200).json("hospital updated")
        else return res.status(500).json({error: 'somthing went wrong'})
    }
    catch(e){
        return res.status(500).json({error: ")"})
    }
}

const minusHospital=async(req,res)=>{
    try{
        const {hospitalName} = req.body
        const user = await hospitalCount.findOne({name: hospitalName})

        if(!user) return res.status(404).json({error: "not found"})

        const newCount = user.count - 1
        const updated = await hospitalCount.updateOne({name: user.name}, {count: newCount})

        if(updated) return res.status(200).json("hospital updated")
        else return res.status(500).json({error: 'somthing went wrong'})
    }
    catch(e){
        return res.status(500).json({error: e})
    }
}

const register=async(req,res)=>{
    try{
        const {username,password,email,isAdmin} = req.body
        if(username!="" && password!="" && email!="" && isAdmin!=""){

            const alreadyExist = await user.findOne({username})
            if(alreadyExist) return res.status(300).json({msg: 'User already exists'})
            const newUser = new user({
                username,password,email,isAdmin
            })
            const result = await newUser.save()
            if(result) res.status(201).json({msg: 'User is registered succesfully'})
            else res.status(500).json({error: 'somthing went wrong'})
        }
    }
    catch(e){
        return res.status(500).send({error})
    }
}

const login=async(req,res)=>{
    try{
        const {username, password} = req.body

        if(username!="" && password!=""){
            const userFound = await user.findOne({username})
            if(userFound){
                if(password == userFound.password){
                    const token = Jwt.sign({
                        userId: userFound._id,
                        username: userFound.username
                    }, process.env.KEY , {expiresIn: "12h"})

                    return res.status(201).json({
                        msg: "Login successful...",
                        username: userFound.username, 
                        token
                    })
                }
                else return res.status(403).json("Password does not match")
            }
            else return res.status(404).json("User not found")
        }
        else return res.status(403).json("please provide all details")
    }
    catch(e){
        return res.status(500).json({error: e})
    }
}

const searchHospital=async(req,res)=>{
    try{
        const hospital = await hospitalCount.find()
        if(!hospital) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(hospital)
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const searchPatient=async(req,res)=>{
    try{
        const {hospital} = req.params

        const found = await patient.find({hospitalName: hospital})
        if(!found) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(found)
    }
    catch(e){
        return res.status(501).send({e})
    }
}

const findUser=async(req,res)=>{
    try{
        const {username} = req.params
        const found = await user.findOne({username}).select('-password')
        if(!found) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(found)
    }
    catch(e){
        return res.status(501).send({e})
    }
}

const userDatas=async(req,res)=>{
    try{
        const {username} = req.params

        const found = await patient.find({fullName: username})
        if(!found) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(found)
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const hospitalAdmin=async(req,res)=>{}

const getAllHospital=async(req,res)=>{
    try{
        const hospital = await allhospital.find()
        if(!hospital) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(hospital)
    }
    catch(e){
        return res.status(501).send({e})
    }
}

const bookHospital=async(req,res)=>{
    try{
        const {hospitalName} = req.body
        const hospital = await allhospital.findOne({title: hospitalName})

        if(!hospital) return res.status(404).json({error: "not found"})

        const newCount = hospital?.bed - 1
        const updated = await allhospital.updateOne({title: hospital.title}, {bed: newCount})

        if(updated) return res.status(200).json("hospital updated")
        else return res.status(500).json({error: 'somthing went wrong'})
    }
    catch(e){
        return res.status(500).json({error: e})
    }
}

const updatePassword=async(req,res)=>{
    try{
        const {username,password,newPass} = req.body
        if(password != "" && username != "" && newPass != ""){
            const userDetail = await user.findOne({username})

            if(userDetail && (password == userDetail.password)){
                const updated = await user.updateOne({username}, {
                    username: userDetail.username,
                    password: newPass,
                    email: userDetail.email,
                    isAdmin: userDetail.isAdmin
                })
                if(updated) return res.status(200).json("Password updated")
                else return res.status(403).json({error: 'Somthing went wrong'})
            }
            else return res.status(404).json({error: 'user not found'})
        } 
        else return res.status(403).json({error: 'Somthing went wrong'})
    }
    catch(e){
        return res.status(500).json({error: e})
    }
}

module.exports = {
    addpatient,
    plusHospital,
    minusHospital,
    register,
    login,
    searchHospital,
    searchPatient,
    findUser,
    userDatas,
    getAllHospital,
    bookHospital,
    updatePassword
}