exports.fileUpload = async (req, res,next) => {
  try {
  res.status(200).json(req.file)
    
  } catch (error) {
    next(error)
  }
}