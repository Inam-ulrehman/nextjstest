import dbConnect from '@/lib/dbConnect'
import { BadRequestError } from '@/lib/errors'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Contact from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  // single contact
  if (method === 'GET') {
    try {
      const result = await Contact.findById(query)
      if (!result) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: 'No record match' })
      }
      return res.status(StatusCodes.OK).json({ msg: 'success', result })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
  // Delete contact
  if (method === 'DELETE') {
    try {
      const result = await Contact.findByIdAndDelete(query)
      if (!result) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: 'Result not found' })
      }

      return res.status(200).json({ msg: 'Contact deleted successfully' })
    } catch (error) {
      mongooseErrorHandler(error, res)
    }
  }
  // Create a Sample
  if (method === 'POST') {
    return res.status(200).json({ name: 'Post your data' })
  }
}
