const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content, owner: req.userId });
    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const filter = { owner: req.userId };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const [items, total] = await Promise.all([
      Note.find(filter).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
      Note.countDocuments(filter)
    ]);
    return res.json({ items, total, page: p, limit: l, pages: Math.ceil(total / l) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: id, owner: req.userId },
      { $set: { title, content } },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json(note);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, owner: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};