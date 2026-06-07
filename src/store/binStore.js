// This file is the memory of your entire app
// It holds all bins and their logged requests using a JavaScript Map

// Step 1: Import nothing — this file has zero dependencies

// Step 2: Create a Map called bins
// A Map works like an object but is better for dynamic keys
// Each key will be a bin ID (UUID string)
// Each value will be an object: { createdAt: Date, requests: [] }

// Step 3: Write a createBin(id) function
// It takes an ID, stores a new entry in the Map
// The entry should have createdAt set to new Date() and an empty requests array

// Step 4: Write a getBin(id) function
// It takes an ID and returns the bin object or undefined if not found

// Step 5: Write an addRequest(id, requestData) function
// It finds the bin by ID and pushes requestData into its requests array
// If the bin doesn't exist, do nothing

// Step 6: Write a getRequests(id) function
// It returns the requests array for a given bin ID

// Step 7: Write a deleteBin(id) function
// It removes the bin from the Map using Map.delete()

// Step 8: Write an getAllBins() function
// It returns the full Map — the ttl.js file will need this to sweep old bins

// Step 9: Export all functions
const bins = new Map()

function createBin(id) {
    bins.set(id, { createdAt: new Date(), requests: [] })
}

function getBin(id) {
    return bins.get(id)
}

function addRequest(id, requestData) {
    const bin = bins.get(id)
    if (bin) {
        bin.requests.push(requestData)
    }
}

function getRequests(id) {
    const bin = bins.get(id)
    return bin ? bin.requests : []
}

function deleteBin(id) {
    return bins.delete(id)
}

function getAllBins() {
    return bins
}

export { createBin, getBin, addRequest, getRequests, deleteBin, getAllBins }