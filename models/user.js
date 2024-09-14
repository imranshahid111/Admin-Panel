import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  answer : {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
