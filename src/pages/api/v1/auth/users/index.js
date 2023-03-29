import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query, headers } = req
  const { userid, name } = headers
  // ===========Get a User=========
  if (method === 'GET') {
    const user = await Users.findById(
      { _id: userid },
      '-password -uuid -role -notes -forgotPasswordId'
    )

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No user found.' })
    }
    return res.status(StatusCodes.OK).json({ msg: 'success', result: user })
  }
  //Update
  if (method === 'PATCH') {
    const {
      name,
      lastName,
      gender,
      dateOfBirth,
      mobile,
      email,
      apartment,
      house,
      street,
      city,
      province,
      country,
      postalCode,
    } = body
    try {
      const user = await Users.findOneAndUpdate(
        { _id: userid },
        {
          name,
          lastName,
          gender,
          dateOfBirth,
          mobile,
          email,
          apartment,
          house,
          street,
          city,
          province,
          country,
          postalCode,
        },
        { runValidators: true }
      )
      return res.status(StatusCodes.OK).json({ msg: 'Profile Updated' })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
  //Update
  if (method === 'POST') {
    const { password } = body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
      const user = await Users.findOneAndUpdate(
        { _id: userid },
        { password: hashedPassword },
        { runValidators: true }
      )
      const { email } = user
      return res.status(StatusCodes.OK).json({ msg: 'password updated' })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
}
