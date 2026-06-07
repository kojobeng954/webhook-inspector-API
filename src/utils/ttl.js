// This file automatically deletes bins that are older than 24 hours
// It runs on a schedule using node-cron

// Step 1: Import node-cron
// Import dotenv and call dotenv.config() to access BIN_TTL_HOURS
// Import getAllBins and deleteBin from binStore.js

// Step 2: Read BIN_TTL_HOURS from process.env
// Convert it to a number and multiply by 3600000 to get milliseconds

// Step 3: Write a sweepExpiredBins() function
// Get the current time using Date.now()
// Loop through getAllBins() using bins.forEach((bin, id) => {})
// For each bin, check if (now - bin.createdAt.getTime()) > TTL in milliseconds
// If yes, call deleteBin(id)
// Log how many bins were deleted

// Step 4: Use cron.schedule() to run sweepExpiredBins every hour
// The cron expression for every hour is '0 * * * *'

// Step 5: Export sweepExpiredBins in case you want to call it manually

import cron from "node-cron"
import dotenv from "dotenv"
import { getAllBins, deleteBin } from "../store/binStore.js"

dotenv.config()
const BIN_TTL_HOURS = process.env.BIN_TTL_HOURS
const TTL = parseInt(BIN_TTL_HOURS) * 3600000

function sweepexpiredBins() {
    const currentTime = Date.now()
    let count = 0
    
    getAllBins().forEach((bin,id) => {
        if (currentTime - bin.createdAt.getTime() > TTL) {
            count++
            deleteBin(id)
            console.log(`Bin deleted: ${id}`)
        }
    });
    console.log(`Total bins deleted: ${count}`)
}

cron.schedule('0 * * * *', sweepexpiredBins)

export default sweepexpiredBins