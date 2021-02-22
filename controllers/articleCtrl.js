const Articles = require('../models/articleModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const articleCtrl = {
    getArticle: async(req, res) =>{
        try {
            const features = new APIfeatures(Articles.find().populate('comments'), req.query)
            .filtering().sorting().paginating()

            const articles = await features.query

            res.json({
                status: 'success',
                result: articles.length,
                articles: articles
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createArticle: async(req, res) =>{
        try {
            const {article_id, title, author, content,image, category, postedBy} = req.body;

           // if (!image) return res.status(400).json({ msg: "No image upload" })

            const article = await Articles.findOne({article_id})
            if(article)
                return res.status(400).json({msg: "This article already exists."})

            const newArticles = new Articles({
                article_id, title: title.toLowerCase(), author, content,image, category,postedBy: postedBy
            })

            await newArticles.save()
            res.json({msg: "Created a article"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteArticle: async(req, res) =>{
        try {
            await Articles.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a article"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateArticle: async(req, res) =>{
        try {
            const {title, content, image, category} = req.body;

            await Articles.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), content, image, category
            })

            res.json({msg: "Updated an article"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    upvotePost: async (req, res) => {
        try {
            await Articles.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { upvote: +1 }
            })

            return res.json({ msg: "liked" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    downvotePost: async (req, res) => {
        try {
            await Articles.findOneAndUpdate({ _id: req.params.id }, {
                $inc: {  downvote: 1 }
            })

            return res.json({ msg: "unliked" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = articleCtrl