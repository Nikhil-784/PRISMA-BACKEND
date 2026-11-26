const prisma = require('../prisma/index')

// Create a new Post
exports.createPost = async(req, res, next) => {
    try {
        const {slug, title, body, authorId} = req.body
        
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: {connect: {id: authorId}}
            }
        })

    } catch (error) {
        throw new Error(error)
    }

}

// Update a Post
exports.updatePost = async(req, res, next) => {
    const {id} = req.param
    const {title, body} = req.body

    try {
        const result = await prisma.post.update({
            where: {id: id},
            data: {
                title,
                body
            }
        })
        
        res.json(result)
    } catch (error) {
        throw new error({error: `Post with ${id} does not exists`})
    }

}

// Delete a Post
exports.deletePost = async (req, res, next) => {
    const {id} = req.param

    try {
        const result = await prisma.post.delete({
            where: {id: id}
        })
        res.json(result)
    } catch (error) {
        req.json({error: `Post with ${id} does not exists`})
    }
}

// Get all Posts
exports.getPosts = async (req, res, next) => {
    try {
        const result = await prisma.post.findMany()
        req.json(result)
    } catch (error) {
        req.json({error: `No post was found`})
    }

}
