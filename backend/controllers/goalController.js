const asyncHandler = require('express-async-handler')


const Goal = require('../models/goalModel')
const User = require('../models/userModel')
//@desc     Get goals
//@route    GET  /api/goals

const { message } = require("statuses")

//access Private
const getGoals = asyncHandler(async(req , res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})


//@desc     Set goal
//@route    POST  /api/goals
//access Private
const setGoals = asyncHandler(async(req , res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }
    const goals = await Goal.create({
        text:req.body.text,
        user: req.user.id
    })
    res.status(200).json(goals)
})


//@desc     Update goals
//@route    PUT  /api/goals/:id
//access Private
const updateGoals = asyncHandler(async(req , res) => {

    const goals = await Goal.findById(req.params.id)

    if(!goals ){
        res.status(400)
        throw new Error('Goal not found ')
    }

    
    // const user = await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoals = await Goal.findByIdAndUpdate(req.params.id , req.body,{
        new: true
    } )
    res.status(200).json(updateGoals)
})


//@desc     Delete goals
//@route    DELETE  /api/goals/:id
//access Private
const deleteGoals = asyncHandler(async(req , res) => {
    const goals = await Goal.findById(req.params.id)

    if(!goals ){
        res.status(400)
        throw new Error('Goal not found ')
    }
    const user = await User.findById(req.user.id)
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goals.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goals.remove()
    res.status(200).json( {id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}