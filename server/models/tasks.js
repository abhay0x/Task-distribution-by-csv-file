const mongoose = require('mongoose');
//creating the schema
const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);

