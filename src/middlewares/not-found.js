const notFound = (req, res) => {
    return res.status(400).send('This route does not exist')
}

export default notFound