import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Comments from "./comments";
import { GlobalState } from '../../../GlobalState'

// const initialState = {
//   comment: ""
// }


export default function CommentBox() {
//   const params = useParams()
//   const state = useContext(GlobalState)
//   const [comment, setComment] = useState(initialState)
//   const [callback, setCallback] = state.postsAPI.callback

//   const handleChangeInput = e => {
//     const { text, value } = e.target
//     setComment({ ...comment, [text]: value })
// }
  return (
    <div className="commentbox_parent_container">
      <div className="commentbox_parent_container_2">
        <div className="comment_box_wrapper">
          <div className="commentbox_container _flex_ _btwn_">
            <div className="user_icon_img"></div>
            <div className="input_comment">
              <input
                placeholder="add comments..."
                type="text"
                className="input_comment_box"
              />
            </div>
            <div className="btn_comment">
              <button className="btn_addcomment">Add comment</button>
            </div>
          </div>
         
        </div>
      </div>
      <Comments />
    </div>
  );
}
