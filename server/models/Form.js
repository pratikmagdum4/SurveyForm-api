import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'dropdown', 'radio', 'checkbox']
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  validation: {
    required: Boolean,
    minLength: Number,
    maxLength: Number,
    options: [String] 
  }
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fields: [fieldSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Form', formSchema);