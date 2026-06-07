// This file logs every incoming request to your console
// It helps you see what's hitting your server while you develop

// Step 1: Write a middleware function with (req, res, next) parameters
// Middleware always takes these three — next() moves to the next function

// Step 2: Inside the function, log the following using console.log:
// req.method — the HTTP method (GET, POST, etc.)
// req.url — the full URL that was hit
// new Date().toISOString() — the exact time of the request

// Step 3: Call next() after logging
// Without this, the request will hang and never reach your route

// Step 4: Export the middleware function
const now = new Date()

function logger(req,res,next) {
    method = req.method
    url = req.url
    timeOfRequest = now.toISOString()
    next()
}

export default logger