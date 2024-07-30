const User = require("../models/user");
const Note = require("../models/note");

const authorizeUser = async (userId, res) => {
  const user = await User.findById(userId);
  if (!user) {
    res.status(401).json({
      success: false,
      message: "You are not authorized."
    });
    return null;
  }
  return user;
};

const findNoteById = async (noteId, userId, res) => {
  const note = await Note.findById(noteId);
  if (!note) {
    res.status(404).json({
      success: false,
      message: "Note not found."
    });
    return null;
  }
  if (note.user.toString() !== userId.toString()) {
    res.status(400).json({
      success: false,
      message: "You are not authorized to access this note."
    });
    return null;
  }
  return note;
};

const addNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    const user = await authorizeUser(req.userId, res);
    if (!user) return;

    const newNote = new Note({
      title,
      content,
      user: user._id
    });

    await newNote.save();
    const note = {
      _id: newNote._id,
      title: newNote.title,
      content: newNote.content,
      createdAt: newNote.createdAt
    };

    res.status(201).json({
      success: true,
      message: "Note added.",
      note
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const user = await authorizeUser(req.userId, res);
    if (!user) return;

    const note = await findNoteById(noteId, user._id, res);
    if (!note) return;

    await Note.deleteOne({ _id: note._id });

    res.status(200).json({
      success: true,
      message: "Note deleted."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const user = await authorizeUser(req.userId, res);
    if (!user) return;

    const note = await findNoteById(noteId, user._id, res);
    if (!note) return;

    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated.",
      note
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const user = await authorizeUser(req.userId, res);
    if (!user) return;

    const note = await findNoteById(noteId, user._id, res);
    if (!note) return;

    res.status(200).json({
      success: true,
      note
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const user = await authorizeUser(req.userId, res);
    if (!user) return;

    const notes = await Note.find({ user: user._id }).select('-user');

    res.status(200).json({
      success: true,
      notes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addNote,
  removeNote,
  updateNote,
  getAllNotes,
  getNoteById
};
