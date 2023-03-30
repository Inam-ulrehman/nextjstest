import dbConnect from '@/lib/dbConnect'
import { UnauthenticatedError } from '@/lib/errors'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req

  // Create a User
  if (method === 'POST') {
    const { email, password } = body

    const user = await Users.findOne({ email })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No user found.' })
    }
    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid Credentials' })
    }

    const token = await user.createJWT()

    return res
      .status(StatusCodes.OK)
      .json({ msg: { user: { name: user.name, role: user.role, token } } })
  }
}
