import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();

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

router.post('/', async (req, res) => {
  try {
    console.log("creating ")
    console.log("The data got is",req.body)
    const form = new Form({
      ...req.body,
      createdBy: req.user.userId
    });
    // console.log("The form is ",form)
    await form.save();
    console.log("saved")
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error creating form' });
  }
});

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