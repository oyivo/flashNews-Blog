import React, { useContext, useState } from "react";
import {GlobalState} from '../../../GlobalState'
import FeedHeader from "./feedHeader";
import Feed from "./feed";
import Loading from '../utils/loading/Loading'
import DialogueBtn from "./dialogueBtn";
import ListGroup from "./listGroup";
import SideNav from "./sideNav";
import LodeMore from "./LoadMore"
import axios from "axios";

export default function Home() {
  const state = useContext(GlobalState)
  const [articles, setArticles] = state.articleAPI.articles
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.articleAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleCheck = (id) =>{
    articles.forEach(article => {
        if(article._id === id) article.checked = !article.checked
    })
    setArticles([...articles])
}

const deleteArticles = async(id, public_id) => {
    try {
        //  setLoading(true)
        //  const destroyImg = axios.post('/api/destroy', {public_id},{
        //     headers: {Authorization: token}
        //  })
        const deleteArticles = axios.delete(`/api/articles/${id}`, {
            headers: {Authorization: token}
        })

         //await destroyImg
        await deleteArticles
        setCallback(!callback)
        //setLoading(false)
    } catch (err) {
        alert(err.response.data.msg)
    }
}


  //if(loading) return <div><Loading /></div>
  return (
    <>
      <div className="_home">
        <div className="side_nav_box">
          {" "}
          <SideNav />
        </div>
        <div className="center_box">
          <FeedHeader />
          <DialogueBtn />
          {
                articles.map(article => {
                    return <Feed key={article._id} article={article}
                    isAdmin={isAdmin} deleteArticles={deleteArticles} handleCheck={handleCheck}
                     />
                })
            } 
              <LodeMore />
          {articles.length === 0 && <Loading/> }
        </div>
        <div className="right_box">
          <ListGroup />
        </div>
      </div>
    </>
  );
}
