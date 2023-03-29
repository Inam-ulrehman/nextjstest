import dbConnect from '@/lib/dbConnect'
import Samples from '@/models/Sample'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req
  // ===========Get a Sample=========
  if (method === 'GET') {
    try {
      const sample = await Samples.find()
      return res.status(200).json({ sample })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
  // Create a Sample
  if (method === 'POST') {
    try {
      const sample = await Samples.create(body)
      return res.status(200).json({ msg: 'Sample Registered' })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
