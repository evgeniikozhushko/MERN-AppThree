const express = require("express");
const router = express.Router();

const { getUsers, createUser, deleteUser } = require("../controllers/userController");

console.log("Loaded getUsers:", getUsers, "createUser:", createUser, "deleteUser");

router.get("/", getUsers);
router.post("/create", createUser);
router.delete("/:id", deleteUser)

module.exports = router;
