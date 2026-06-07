// This is the entry point — it starts the server

// Step 1: Import dotenv and call dotenv.config()
// Import the app from src/app.js
// Import sweepExpiredBins from src/utils/ttl.js

// Step 2: Read PORT from process.env, default to 3000

// Step 3: Start the cron job by calling sweepExpiredBins()
// Actually the cron schedules itself on import — just importing ttl.js is enough
// But call sweepExpiredBins() once manually on startup to clean any leftover bins

// Step 4: Call app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
import dotenv from "dotenv"
import app from "./app.js"
import sweepExpiredBins from "./utils/ttl.js"
dotenv.config()
const PORT = process.env.PORT || 3000
sweepExpiredBins()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})