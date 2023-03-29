import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import { UserRegistrationEmail } from '@/lib/sendgrid/UserRegistrationEmail'
import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  // Create a User
  if (method === 'POST') {
    const { name, lastName, email, password, gender, dateOfBirth } = req.body
    const isFirstAccount = await User.countDocuments({})
    const role = isFirstAccount === 0 ? 'admin' : 'user'

    const uuid = uuidv4()

    try {
      const user = await User.create({
        name,
        lastName,
        gender,
        dateOfBirth,
        email,
        password,
        role,
        uuid,
      })
      const token = await user.createJWT()
      UserRegistrationEmail({ email, uuid })
      res
        .status(StatusCodes.CREATED)
        .json({ msg: { user: { name: user.name, token } } })
    } catch (error) {
      mongooseErrorHandler(error, res)
    }
  }
}
