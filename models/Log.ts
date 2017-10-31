// Imports
import { Schema, model } from 'mongoose';


// Log Schema 
let LogSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: '',
    required: true
  },
  logEntry: {
    type: String,
    default: '',
    required: true
  }
});


// Export
export default model('Log', LogSchema);