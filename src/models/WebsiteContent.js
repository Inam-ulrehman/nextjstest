import mongoose from 'mongoose'

const SampleSchema = new mongoose.Schema(
  {
    landing: {
      heading: { type: String, lowercase: true, trim: true },
      subHeading: { type: String, lowercase: true, trim: true },
      description: { type: String, lowercase: true, trim: true },
      image: { type: String, lowercase: true, trim: true },
    },
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 100,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 3,
      max: 1000,
    },
    shipping: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    slot: {
      startDate: { type: String, lowercase: true, trim: true },
      endDate: { type: String, lowercase: true, trim: true },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Sample || mongoose.model('Sample', SampleSchema)
