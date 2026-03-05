  import express from "express";
  import cors from "cors";

  const app = express();

  app.use(express.json());

  app.use(cors());

  const users = []

  app.get("/", (req, res) => {
        res.json({ message : "Server is running"})
  })

  app.post("/signup", (req, res) => {
      const {name, username, email, password, confirmPassword} = req.body

      // Extra validation (Never trust the frontend)
      if(!name || !username || !email || !password || !confirmPassword) {
          return res.status(400).json({ error : "All fields are required" })
      }

      // Check if user already exist
      const existingUser = users.find(u => u.username === username);
      if(existingUser) {
        return res.status(409).json({ error: "Username is already taken"})
      }


      // Save user
      const newUser = {id: users.length + 1, name, username, email, password}
      users.push(newUser);

      res.status(201).json({ message: "New user created"})
  })

  // login
  app.post("/login", (req, res) => {
      // creating variables for fields
      const {username, password} = req.body

      // Validation: Making sure all fields are filled
      if(!username || !password) {
          return res.status(400).json({ error: "All fields are required" })
      }

      // Validation 2: making sure user entered correct credentials
      const user = users.find(u => u.username === username && u.password === password)
      if(!user){
        return res.status(401).json({ error: "Invalid Credentials" })
      }

      // Fake jwt token
      res.json({ message: "Login successful", token: "fake-token-123", user: { id:user.id, name:user.name } })

  })



  const PORT = 5000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  })
