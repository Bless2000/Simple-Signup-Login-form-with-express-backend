// importing dependencies
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

// applying expess module
const app = express();


// client request data parsing
app.use(express.json());

// Ability to fetch data from the frontend
app.use(cors());


// array to store users
const users = [];

// "/" route
app.get("/", (req, res) => {
    res.json({ message: "Server is running "})
})

// Signup route
app.post("/signup", async (req, res) => {
     console.log("Incoming body:", req.body); // <-- debug line

  if (!req.body || !req.body.username || !req.body.password || !req.body.name || !req.body.email) {
    return res.status(400).json({ message: "All fields are required" });
  }
    const { username, password, name, email } = req.body //gets data from frontend

    // 1. Check if the username already exists
    const userExists = users.find(u => u.username === username);
    if( userExists ) return res.status(400).json({ message: "User already exists" })

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // 3. Store the user
    users.push({ username, password: hashedPassword, name, email  });

    console.log(users);
    

    // 4. Respond success
    res.status(201).json({ message: "User registered successfully" });
})

app.post("/test-body", (req, res) => {
  console.log("Body received:", req.body);
  res.json({ body: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})
