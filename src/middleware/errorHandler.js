// This file catches any errors that happen in your routes
// Express recognizes it as an error handler because it takes 4 parameters

import { error } from "node:console";

// Step 1: Write a function with (err, req, res, next) parameters
// The extra first parameter (err) is what makes Express treat this as an error handler

// Step 2: Log the error to the console using console.error(err.stack)
// This shows the full error trace in your terminal

// Step 3: Send a JSON response with status 500
// The response body should be: { error: err.message }

// Step 4: Export the function

function errorHandler(err,req,res,next) {
    res.status(500).json({error: err.message})
    console.log(err.stack)
}
export default errorHandler