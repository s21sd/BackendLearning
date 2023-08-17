const express = require('express');
const router = express.Router();
const Blog = require('../MODELS/Blog');
const auth = require('../Middlewares/auth');
router.post('/createblog', auth, async (req, res) => {
    const owner = req.user._id;
    const { title, blog } = req.body;
    try {
        const newblog = new Blog({
            title,
            blog,
            owner
        })

        await newblog.save();
        res.json({
            message: 'Blog Created Successfully'
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }

});

router.get('/getallblogs', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.json({
            message: 'ok',
            blogs
        })
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
})



router.get('/getallblogs/:id', async (req, res) => {
    try {
        const blogs = await Blog.findById(req.params.id);
        res.json({
            message: 'ok',
            blogs
        })
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
})

router.patch('/updateblog/:id', async (req, res) => {
    const { title, blog } = req.body;
    try {
        const newblogs = await Blog.findOne({ _id: req.params.id });
        if (!newblogs) {
            return res.status(404).json({
                message: 'Blog Not Found'
            })
        }
        newblogs.title = title;
        newblogs.blog = blog;
        await newblogs.save();
        res.json({
            message: 'Blog update successfully',
            newblogs
        })
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
})
module.exports = router;