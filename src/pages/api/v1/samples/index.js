import dbConnect from '@/lib/dbConnect'
import Sample from '@/models/Sample'
import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req
  // ===========Get a Sample=========
  if (method === 'GET') {
    try {
      const { name, email, mobile, sort } = req.query
      const queryObject = {}
      let sorted = ''

      // name
      if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
      }

      if (sort) {
        const sortList = sort.split(',').join(' ')
        sorted = sortList
      }

      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10
      const skip = (page - 1) * limit
      const total = await Sample.find()

      let result = await Sample.find(queryObject)
        .sort(`${sorted}`)
        .skip(skip)
        .limit(limit)

      return res
        .status(StatusCodes.OK)
        .json({ success: true, nbHits: total.length, result })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error })
    }
  }
  // Create a Sample
  if (method === 'POST') {
    try {
      const sample = await Sample.create(body)
      return res
        .status(StatusCodes.OK)
        .json({ success: true, msg: 'Sample Registered' })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error })
    }
  }
}
