import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  registerusername: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: 'user',
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

 
UserSchema.virtual('bookings', {
  ref: 'bookings', 
  localField: '_id',  
  foreignField: 'user_id', 
});

const OtpUserModel = mongoose.models.admin_users || mongoose.model('admin_users', UserSchema);
export default OtpUserModel;
