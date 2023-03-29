import dbConnect from '@/lib/dbConnect'
import { UnauthenticatedError } from '@/lib/errors'
import EmailLinkForgotPassword from '@/lib/sendgrid/EmailLinkForgotPassword'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  if (method === 'POST') {
    const { email } = body
    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No user found.' })
    }
    const forgotPasswordId = uuidv4()
    const updateUser = await Users.findOneAndUpdate(
      { email },
      { forgotPasswordId }
    )
    const emailResult = await EmailLinkForgotPassword({
      email,
      forgotPasswordId,
    })
    if (emailResult.msg === 'success') {
      return res.status(StatusCodes.OK).json(emailResult)
    }
    if (emailResult.msg === 'error') {
      return res.status(StatusCodes.BAD_GATEWAY).json(emailResult)
    }
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Route Does not exist' })
  }
}
