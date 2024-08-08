import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

const OtpUserModel = mongoose.models.otpusers || mongoose.model('otpusers', UserSchema);
export default OtpUserModel;
