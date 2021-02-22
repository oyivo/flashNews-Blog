import React from 'react'
import CreateArticle from '../createArticle/CreateArticle'

function dashboard() {
    return (
        <>
            <div className="dash_container">
               <div className="_flex_ dash">
                <div className="side_dash">
                    <ul className="dashnav">
                        <li>side</li>
                        <li>side</li>
                        <li>side</li>
                        <li>side</li>
                        <li>side</li>
                        <li>side</li>
                        <li>side</li>
                    </ul>
                </div>

                  <div className="header_render">
                    <div className="dash_header">
                            <div className="dash_item_container card">
                                <p>total members</p>
                            </div>

                            <div className="dash_item_container card">
                            <p>members online</p>
                            </div>

                            <div className="dash_item_container card">
                            <p>total articles</p>
                            </div>

                            <div className="dash_item_container card">
                            <p>reports</p>
                            </div>

                            <div className="dash_item_container card">
                                categories
                            </div>

                            <div className="dash_item_container card">
                            <p>total comments</p>
                            </div>
                        </div>

                         {/* ..........admin render............. */}
                          <div> <CreateArticle /> </div>
                  </div>
               </div>

              
            </div>
        </>
    )
}

export default dashboard
