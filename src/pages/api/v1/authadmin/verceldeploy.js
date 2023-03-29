import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Users from '@/models/User'
import axios from 'axios'
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
  // =========Vercel =========
  if (method === 'POST') {
    try {
      const result = await axios.post(process.env.VERCEL_DEPLOY_HOOK)
      console.log(result.data.job.state)
      return res
        .status(StatusCodes.OK)
        .json({ msg: 'success', result: result.data })
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'error', result: error })
    }
  }
}
