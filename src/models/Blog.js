import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    heading: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },

    image: {
      type: [],
      required: [true, 'Please provide image'],
    },
    blogHeading: {
      type: String,
      lowercase: true,
      trim: true,
    },
    blogDescription: {
      type: String,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
