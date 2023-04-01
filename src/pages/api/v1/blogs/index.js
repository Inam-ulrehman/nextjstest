import dbConnect from '@/lib/dbConnect'
import Blogs from '@/models/Blog'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query } = req
  // ===========Get a Blog=========
  if (method === 'GET') {
    try {
      const blog = await Blogs.find()
      return res.status(200).json({ blog })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
  // Create a Blog
  if (method === 'POST') {
    try {
      const blog = await Blogs.create(body)
      return res.status(200).json({ msg: 'Blog Registered' })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
