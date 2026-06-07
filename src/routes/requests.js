// This file accepts ANY HTTP method at /bins/:id/requests
// It logs the full incoming request and saves it to the bin

// Step 1: Import express Router
// Import getBin and addRequest from binStore.js

// Step 2: Write a handler function called logRequest(req, res)
// Extract the following from the request:
// req.method, req.headers, req.body, req.query, req.ip
// Build a requestData object with all of these plus a timestamp using new Date()

// Step 3: Check if the bin exists using getBin(req.params.id)
// If not, respond with 404 and { error: 'Bin not found' }

// Step 4: Call addRequest(req.params.id, requestData) to save it

// Step 5: Emit an SSE event — import the sseClients Map from stream.js here
// Get the list of SSE clients for this bin ID
// For each client, write the new request data as an SSE event
// Format: res.write(`data: ${JSON.stringify(requestData)}\n\n`)

// Step 6: Register logRequest for ALL HTTP methods using router.all()
// router.all('/:id/requests', logRequest)

// Step 7: Export the router
import express from "express";
import { getBin, addRequest } from "../store/binStore.js";
import { sseClients } from "./stream.js";
const router = express.Router();

function logRequest(req,res) {
    const requestData = {
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query,
        ip: req.ip,
        timestamp: new Date()
    }
    const binId = req.params.id
    const bin = getBin(binId)
    if (!bin) {
        res.status(404).json({ error: 'Bin not found' })
    } else {
        addRequest(binId, requestData)
        const clients = sseClients.get(binId) || []
        clients.forEach(clientRes => {
            clientRes.write(`data: ${JSON.stringify(requestData)}\n\n`)
        })
        res.status(200).json({ message: 'Request logged' })
    }
}
router.all('/:id/requests', logRequest)

export default router