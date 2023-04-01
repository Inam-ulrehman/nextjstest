import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Users from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
const cloudinary = require('cloudinary').v2
const upload = multer({ dest: '/tmp/uploads' })
const fs = require('fs')
export const config = {
  api: {
    bodyParser: false,
  },
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
export default async function handler(req, res) {
  dbConnect()
  const { method, body, query, headers } = req
  const { userid, name } = headers

  if (method === 'POST') {
    const middleware = upload.single('file')
    middleware(req, res, async () => {
      if (req.file === undefined) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: `File name must be 'file'` })
      }
      const path = req.file.path
      try {
        const result = await cloudinary.uploader.upload(path, {
          use_filename: true,
          unique_filename: false,
          folder: 'inamwebsolutions-nextjs/testing',
          width: '1200',
          height: '628',
          crop: 'fill',
          // background_removal: 'cloudinary_ai',
        })
        fs.unlinkSync(path)
        return res
          .status(StatusCodes.ACCEPTED)
          .json({ msg: 'file is uploaded', result })
      } catch (error) {
        fs.unlinkSync(path)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: 'uploading error by cloudinary', result: error })
      }
    })
  }
}
