const router = require('express').Router()
const articleCtrl = require('../controllers/articleCtrl')


router.route('/articles')
    .get(articleCtrl.getArticle)
    .post(articleCtrl.createArticle)


router.route('/articles/:id')
    .delete(articleCtrl.deleteArticle)
    .put(articleCtrl.updateArticle)

 router.route('/articles/:id/like-post')
    .put(articleCtrl.upvotePost)

router.route('/articles/:id/unlike-post')
    .put(articleCtrl.downvotePost)    



module.exports = router