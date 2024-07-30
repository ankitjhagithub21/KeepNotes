const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const {addNote, removeNote, updateNote, getAllNotes, getNoteById} = require("../controllers/noteController")
const noteRouter = express.Router()

noteRouter.post("/add",isAuthenticated,addNote)
noteRouter.delete("/:id",isAuthenticated,removeNote)
noteRouter.put("/:id",isAuthenticated,updateNote)
noteRouter.get("/",isAuthenticated,getAllNotes)
noteRouter.get("/:id",isAuthenticated,getNoteById)


module.exports = noteRouter