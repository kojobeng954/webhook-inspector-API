// This file sets up Express and wires everything together

// Step 1: Import express
// Import your middleware: logger and errorHandler
// Import your routes: bins, requests, stream
// Import dotenv and call dotenv.config()

// Step 2: Create the Express app with const app = express()

// Step 3: Register global middleware in this exact order:
// express.json() — parses JSON request bodies
// express.urlencoded({ extended: true }) — parses form data
// your logger middleware

// Step 4: Mount your routes:
// app.use('/bins', binsRouter)
// app.use('/bins', requestsRouter)
// app.use('/bins', streamRouter)

// Step 5: Mount errorHandler LAST — after all routes
// app.use(errorHandler)

// Step 6: Export the app
import express from "express";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import binsRouter from "./routes/bins.js";
import requestsRouter from "./routes/requests.js";
import streamRouter from "./routes/stream.js";
import dotenv from "dotenv";
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use('/bins', binsRouter)
app.use('/bins', requestsRouter)
app.use('/bins', streamRouter)
app.use(errorHandler)
export default app