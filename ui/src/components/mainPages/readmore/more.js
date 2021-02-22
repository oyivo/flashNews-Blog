import React from 'react'
import TextTruncate from 'react-text-truncate'
// import CommentBox from "./commentBox";
import BtnRender from '../home/BtnRender'
import { Link } from "react-router-dom";


function More({article, isAdmin, deleteArticles, handleCheck}) {
    let profileImg =  "https://qsf.fs.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
    return (
        <div>

       <div className="more_container card_more">
        <div className="feed_inner_container">
          <div className="recomended_">
            <h6>Answer. Recomended for you</h6>
            <div className="_times_icon">
              <i className="fa fa-times _icons_times" aria-hidden="true"></i>
            </div>
          </div>
          <div className="feed_profile">
            <div className="feed_profile_img">
                <img  src={profileImg} alt="oops"/>
            </div>

            <div className="feed_profile_title_">
              <div className="_profile_title_holder">
                 <span>Posted by: {article.author}</span>
              </div>
            </div>
          </div>
          <div className="feed_content_">
            <h5 className="feed_header_content">
              {article.title}
            </h5>
            <p>
              <TextTruncate 
                line={3}
                element='p'
                truncateText="..."
                text={article.content}
                textTruncateChild={
                  <Link className="read_more" to={`/read/${article._id}`}>Read More</Link>
                }
              />
            </p>
          </div>
          <div className="content_img_">
              <img src={article.image} alt="oops"/>
          </div>

          <div className="content_icon_action _flex_ _btwn_">
            <div className="right_icon_act _flex_">
              <div className="_act_style_1">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-up-short"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
                <span>{article.upvote}</span>
              </div>
              <div className="_act_style">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-repeat"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fill-rule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                <span>{article.share}</span>
              </div>
              <div className="_act_style">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-chat"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                  />
                </svg>
                <span>4</span>
              </div>
            </div>

            <div className="left_icon_act _flex_">
              <div className="_act_style">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-reply"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z"
                  />
                </svg>
              </div>
              <div className="_act_style">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-three-dots"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <BtnRender article={article} deleteArticles={deleteArticles} />
        </div>
        </div>

                           

                            {/* <div className="more_container card_more">
                               <p>total comments</p>
                            </div> */}
             </div>
      
    )
}

export default More
