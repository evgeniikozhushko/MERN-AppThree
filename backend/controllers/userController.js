const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  // 1. Check if name exists
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required." });
  }
  // 2. Check if email exists  
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "Email is required." });
  }

  // Basic email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

// Check duplicates FIRST (expensive DB query)
  const existingUser = await User.findOne({ email })
  if  (existingUser) {
    return res.status(409).json({ message: 'Email already Exists.'})
  }

  // Creating a User
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Create User - Server error." });
  }
};

 // Delete a User
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found"})
    }
    res.json({ message: "User deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}