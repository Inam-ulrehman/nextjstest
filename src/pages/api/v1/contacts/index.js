import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Contacts from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  // Create a Contact
  if (method === 'POST') {
    try {
      const contact = await Contacts.create(body)
      return res
        .status(StatusCodes.OK)
        .json({ msg: 'Your request is registered' })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
}
