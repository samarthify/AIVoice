const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  callId: { type: String, required: true, unique: true },
  participants: [{ 
    userId: String, 
    joinedAt: Date,
    leftAt: Date 
  }],
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  duration: Number,
  status: { 
    type: String, 
    enum: ['initiated', 'connecting', 'active', 'ended'],
    default: 'initiated'
  },
  transcription: [{
    timestamp: Date,
    speaker: String,
    text: String,
    confidence: Number
  }],
  recordingUrl: String
});

module.exports = mongoose.model('Call', callSchema);
