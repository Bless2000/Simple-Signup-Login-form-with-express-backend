import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.use(cors());

const SECRET_KEY = "supersecretkey123"

const users = []

app.get("/", (req, res) => {
      res.json({ message : "Server is running"})
})

app.post("/api/auth/signup", async (req, res) => {
    const {name, username, email, password} = req.body

    // Extra validation (Never trust the frontend)
    if(!name || !username || !email || !password) {
        return res.status(400).json({ error : "All fields are required" })
    }

    // Check if user already exist
    const existingUser = users.find(u => u.username === username);
    if(existingUser) {
      return res.status(409).json({ error: "Username is already taken"})
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Save user
    const newUser = {id: users.length + 1, name, username, email, password: hashedPassword}
    users.push(newUser);

    res.status(201).json({ message: "New user created"})
})

// login
app.post("/api/auth/login", async (req, res) => {
    // creating variables for fields
    const {username, password} = req.body

    // Validation: Making sure all fields are filled
    if(!username || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // Validation 2: making sure user entered correct credentials
    const user = users.find(u => u.username === username)
    if(!user){
      return res.status(401).json({ error: "Invalid Credentials" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return res.status(401).json({ error: "Invalid Credentials" })
    }

    // Sign JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "7d" })

    //jwt token
    res.json({ message: "Login successful", token, user: { id:user.id, name:user.name } })

})



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
