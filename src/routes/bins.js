// This file handles creating and retrieving bins

// Step 1: Import express and create a Router using express.Router()
// Import generateId from utils/generateId.js
// Import createBin, getBin, getRequests from store/binStore.js

// Step 2: Write POST / route
// Call generateId() to get a new ID
// Call createBin(id) to store it
// Respond with status 201 and JSON: { binId: id, url: `/bins/${id}/requests` }

// Step 3: Write GET /:id route
// Call getBin(id) using req.params.id
// If the bin doesn't exist, respond with status 404 and { error: 'Bin not found' }
// If it exists, respond with the bin's details including its request count

// Step 4: Export the router
import express from "express";
import { generateId } from "../utils/generateId.js";
import { createBin, getBin, getRequests } from "../store/binStore.js";

const Router =express.Router()

Router.post("/",(req,res) => {
    const newId = generateId()
    createBin(newId)
    const bin = getBin(newId)
    try {
        res.status(201).json({
    binId: newId,
    url: `/bins/${newId}/requests`
})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

Router.get("/:id",(req,res) => {
    const newId = req.params.id
    const bin = getBin(newId)
    const binRequests = getRequests(newId)
    if (!bin) {
        res.status(404).json({ error: 'Bin not found' })
    } else {
        res.status(200).json({ binId: newId, url: `/bins/${newId}/requests`,
            createdAt: bin.createdAt,
    requestCount: bin.requests.length })
    }
})

export default Router