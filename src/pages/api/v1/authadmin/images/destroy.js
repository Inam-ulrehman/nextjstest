import dbConnect from '@/lib/dbConnect'
import { StatusCodes } from 'http-status-codes'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
export default async function handler(req, res) {
  dbConnect()
  const { method, body, query, headers } = req
  const { userid, name } = headers

  if (method === 'POST') {
    if (body.public_id === undefined) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please provide public_id' })
    }
    try {
      const result = await cloudinary.uploader.destroy(`${body.public_id}`)
      return res.status(StatusCodes.OK).json({ msg: `File destroy`, result })
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Unable to destroy file`, result: error })
    }
  }
}
