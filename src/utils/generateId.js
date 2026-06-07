// This file generates a unique ID for every new bin

// Step 1: Import the uuid package
// You want the v4 function specifically — it generates a random UUID
import { v4, uuidv4 } from "uuid"

// Step 2: Write a generateId() function
// It calls uuidv4() and returns the result

// Step 3: Export the function
export function generateId() {
    return uuidv4()
}
