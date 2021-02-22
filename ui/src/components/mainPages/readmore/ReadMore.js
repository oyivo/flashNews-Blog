import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Feed from '../home/feed'
import More from './more'
import CommentBox from "../home/commentBox";
import Comments from "../home/comments";

const initialState = {
    name: "",
    comment: ""
}

function ReadMore() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [articles] = state.articleAPI.articles
    const [readMore, setReadMore] = useState([])
    const [comment, setComment] = useState(initialState)
    const [callback, setCallback] = state.articleAPI.callback

    useEffect(() =>{
        if(params.id){

            articles.forEach(article => {
                if(article._id === params.id) setReadMore(article)
            })
        }
    },[params.id, articles])

    if(readMore.length === 0) return null;

    const handleChangeInput = e => {
        const { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }

    const addComment = async (e) => {
        e.preventDefault()
        try {
            
            await axios.post(`/api/articles/${readMore._id}/comments`, comment)
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    const upvotePost = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/api/articles/${readMore._id}/like-post`)
          
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    
    const downvotePost = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/api/articles/${readMore._id}/unlike-post`)
        
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <div className="detail">
                <img src={readMore.image} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{readMore.title}</h2>
                    </div>
                    <span className="readmore">Author: {readMore.author}</span>
                    <p className="readmoreContent">{readMore.content}</p>
                    <div className="vote-container">
                  <div>
                     <button onClick={upvotePost}> <span>{readMore.upvote}Like</span></button>
                     <button onClick={downvotePost}> <span>{readMore.downvote}Unlike</span></button>
                    <button > <span>share</span></button></div>                 
                </div>
                </div>
               
                <CommentBox handleChangeInput={handleChangeInput}/>
            </div>
         
            <div className="related_header">
                <h2>Related articles</h2>
                <div className="more_header">
                    {
                        articles.map(article => {
                            return article.category === readMore.category 
                                ? <Feed key={article._id} article={article} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ReadMore
