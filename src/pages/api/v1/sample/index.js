import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'
export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query, headers } = req
  const { userid, name } = headers
  // ===========Get a User=========
  if (method === 'GET') {
    const user = await Users.find()
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No user found.' })
    }
    return res.status(StatusCodes.OK).json({ msg: 'success', result: user })
  }

  if (method === 'POST') {
    try {
      return res.status(StatusCodes.OK).json({ msg: 'post request' })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
}
