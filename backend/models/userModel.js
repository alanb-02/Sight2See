import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetToken: { type: String },
    password: { type: String, required: true },
    ppsn: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false, required: true },
    prsiUsed: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
