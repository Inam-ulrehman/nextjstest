import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Blogs from '@/models/Blog'
import User from '@/models/User'

import { StatusCodes } from 'http-status-codes'

export default async function handler(req, res) {
  await dbConnect()
  const { method, body, query, headers } = req
  const userId = headers.userid
  const { image, heading, description, blogHeading, blogDescription } = body
  if (method === 'POST') {
    try {
      const user = await User.findById({ _id: userId })
      console.log(user)
      const author = `${user.name} ${user.lastName}`
      console.log(author)
      const blog = await Blogs.create({
        image,
        heading,
        description,
        blogHeading,
        blogDescription,
        author,
        createdBy: userId,
      })

      return res
        .status(StatusCodes.CREATED)
        .json({ msg: 'Blog is created', result: blog })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
  // =============All Items====================
  if (method === 'GET') {
    try {
      const {
        searchHeading,
        searchDescription,
        searchBlogHeading,
        searchBlogDescription,
        sort,
      } = req.query
      const queryObject = {}
      let sorted = ''

      if (searchHeading) {
        queryObject.heading = { $regex: searchHeading, $options: 'i' }
      }

      if (searchDescription) {
        queryObject.description = {
          $regex: searchDescription,
          $options: 'i',
        }
      }

      if (searchBlogHeading) {
        queryObject.blogHeading = {
          $regex: searchBlogHeading,
          $options: 'i',
        }
      }
      if (searchBlogDescription) {
        queryObject.blogDescription = {
          $regex: searchBlogDescription,
          $options: 'i',
        }
      }

      if (sort) {
        const sortList = sort.split(',').join(' ')
        sorted = sortList
      }

      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10
      const skip = (page - 1) * limit

      const totalBlogs = await Blogs.find(queryObject)

      let result = await Blogs.find(queryObject)
        .sort(`${sorted}`)
        .skip(skip)
        .limit(limit)

      return res
        .status(StatusCodes.OK)
        .json({ msg: 'success', nbHits: totalBlogs.length, list: result })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
  // Delete Many Items
  if (method === 'PATCH') {
    // ========deleteManyBlogs======START

    const _ids = req.body.map((item) => item._id)
    try {
      const result = await Blogs.deleteMany({ _id: { $in: _ids } })
      return res.status(StatusCodes.OK).json({ msg: 'success', result })
    } catch (error) {
      return mongooseErrorHandler(error, res)
    }
  }
}
