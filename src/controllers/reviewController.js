import Review from "../models/reviewModel.js"


export async function createReview(req, res) {
    res.send('create review')
}

export async function getAllReviews(req, res) {
    res.send('get all review')
}


export async function getSingleReview(req, res) {
    res.send('get single review')
}

export async function updateReview(req, res) {
    res.send('update review')
}

export async function deleteReview(req, res) {
    res.send('delete review')
}