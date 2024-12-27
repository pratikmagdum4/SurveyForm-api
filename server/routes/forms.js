import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();

// Get all forms for the authenticated user
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find({ createdBy: req.user.userId })
      .sort({ createdAt: -1 });
      console.log("hi i m here  ")
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms' });
  }
});

// Create a new form
router.post('/', async (req, res) => {
  try {
    const form = new Form({
      ...req.body,
      createdBy: req.user.userId
    });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error creating form' });
  }
});

// Get a specific form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form' });
  }
});

// Update a form
router.put('/:id', async (req, res) => {
  try {
    const form = await Form.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error updating form' });
  }
});

// Delete a form
router.delete('/:id', async (req, res) => {
  try {
    const form = await Form.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form' });
  }
});

export default router;