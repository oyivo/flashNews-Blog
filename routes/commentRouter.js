const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')



router.route('/comments')
    .get(commentCtrl.getComments)

 router.route('/artices/:id/comments')
      .post(commentCtrl.createComment)    


module.exports = router
