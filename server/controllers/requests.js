const mongoose = require('mongoose')
const Request = require('../models/requests')
const asyncHandler = require('express-async-handler')
const { request } = require('express')

const RequestController = {
  Create: asyncHandler(async (req, res) => {
    const {text, userCreatedBy} = req.body
    if (!text) {
      res.status(400)
      throw new Error('fill in all fields')
    }

    const request = new Request({text, userCreatedBy});
    request.save()
    return res.json(request)
   }),
 
   View: asyncHandler(async (req, res) => {
     const requests = await Request.find().sort({createdAt:-1})
     if(requests) {
      res.status(201).json({
        requests: requests
      })
    }
   }),

   Filter: asyncHandler(async (req, res) => {
    const searchCity = req.params.city
    const filteredRequests = await Request.find({"userCreatedBy.city": `${searchCity}`})
    if(filteredRequests) {
     res.status(201).json({
       requests: filteredRequests
     })
   }
  }), 

Fulfilled: asyncHandler(async (req, res) => {
  const requestId = req.params._id
  console.log(req.body.samaritan)
  await Request.findOneAndUpdate({_id: requestId}, { $set:{ active: "PENDING", fulfilledBy: req.body.samaritan}})
  const changedRequest = await Request.find({_id: requestId})
  if(changedRequest) {
    res.status(201).json(changedRequest)
  }
}),

ActiveFilter: asyncHandler(async (req, res) => {
  const filteredRequests = await Request.find({active: "NEW"})
    if(filteredRequests) {
     res.status(201).json({
       requests: filteredRequests
     })
}})

}

module.exports = RequestController

