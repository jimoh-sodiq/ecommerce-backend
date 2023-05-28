const errorHandler = async (err, req, res, next) => {
    conosle.log(err)
    return res.status(500).json({ msg: "Something went wrong"})
}

export default errorHandler