import React from 'react'
import './loading.css'

function Loading() {
    return (
  <div className="wrapperloading">
     <div className="text">LOADING</div>
    <div className="inner">
        <div className="loading up"></div>
        <div className="loading down"></div>
    </div>
</div>
    )
}

export default Loading
