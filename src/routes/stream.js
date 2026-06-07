// This file handles the SSE (Server-Sent Events) live connection
// A developer opens this URL and gets a live feed of incoming requests

// Step 1: Import express Router

// Step 2: Create a Map called sseClients
// Key: bin ID
// Value: array of response objects (one per connected client)
// Export this Map so requests.js can use it to push events

// Step 3: Write GET /:id/stream route
// Set these response headers:
// Content-Type: text/event-stream
// Cache-Control: no-cache
// Connection: keep-alive

// Step 4: Send an initial SSE comment to confirm connection
// Write: res.write(': connected\n\n')

// Step 5: Add this response object to the sseClients Map
// If no array exists for this bin ID yet, create one first

// Step 6: Handle the close event on the request
// When the client disconnects, remove their res object from the sseClients array
// Use req.on('close', () => { ... })

// Step 7: Export the router and sseClients Map

import express from "express";
const router = express.Router();

export const sseClients = new Map()

router.get("/:id/stream", (req, res) => {
    const binId = req.params.id

    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })

    res.write(': connected\n\n')

    // If no array exists for this bin yet, create one
    if (!sseClients.has(binId)) {
        sseClients.set(binId, [])
    }

    // Add this client's response object to the array
    sseClients.get(binId).push(res)

    // When client disconnects, remove their res from the array
    req.on('close', () => {
        const clients = sseClients.get(binId) || []
        const filtered = clients.filter(clientRes => clientRes !== res)
        sseClients.set(binId, filtered)
    })
})

export default router