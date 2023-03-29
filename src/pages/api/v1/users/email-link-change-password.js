import dbConnect from '@/lib/dbConnect'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import EmailChangePassword from '@/lib/sendgrid/EmailChangePassword'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  if (method === 'POST') {
    const { id: forgotPasswordId, password } = body
    const user = await Users.findOne({ forgotPasswordId })
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Token Id is already used' })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // generate another id
    const uuid = uuidv4()
    await Users.findOneAndUpdate(
      { forgotPasswordId },
      { password: hashedPassword, forgotPasswordId: uuid }
    )

    const { email } = user
    const emailResult = await EmailChangePassword({ email })
    // if (emailResult.msg === 'success') {
    //   return res.status(StatusCodes.OK).json(emailResult)
    // }
    // if (emailResult.msg === 'error') {
    //   return res.status(StatusCodes.BAD_GATEWAY).json(emailResult)
    // }
    return res.status(StatusCodes.OK).json({ msg: 'Password updated' })
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Route Does not exist' })
  }
}
