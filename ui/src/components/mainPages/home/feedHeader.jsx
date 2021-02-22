import React from 'react';

export default function FeedHeader() {
  return (
    <>
    <div className="_feedheader_box">
       <div className="_feedheader_inner">
           <div className="_feedheader_flex">
               <h6>Build your new following feed!</h6>
              <div className="feedheader_close"> <i className="fa fa-times" aria-hidden="true"></i></div>
           </div>
           <div className="feedheader_flex_2">
               <div className="_flex_2_items">
                   <p>Discover stories by following Spaces and people that interest you.</p>
                   <button className="btn btn-primary">Check it out</button>
               </div>
               <div className="_flex_2_items">
               <i className="fa fa-users" aria-hidden="true"></i>
               </div>
           </div>
       </div>
    </div>
    </>
  );
}
