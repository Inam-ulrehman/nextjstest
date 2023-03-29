if (method === 'POST') {
  console.log('post hit')
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
        folder: 'next/testing',
        width: '720',
        height: '720',
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
