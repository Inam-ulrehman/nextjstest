import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Sample from '@/models/Sample'
import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  // Get a Sample
  if (method === 'GET') {
    try {
      const result = await Sample.findById({ _id: query.id })
      if (!result) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, msg: 'No record found' })
      }
      return res.status(200).json({ success: true, result })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }

  // Delete a sample
  if (method === 'DELETE') {
    try {
      const result = await Sample.findByIdAndDelete({ _id: query.id })
      return res
        .status(StatusCodes.OK)
        .json({ success: true, msg: 'Record is deleted' })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
  // Create a Sample
  if (method === 'POST') {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, msg: 'Post your data' })
  }
}
