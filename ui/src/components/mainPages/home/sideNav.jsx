import React, {useContext} from "react";
import {GlobalState} from '../../../GlobalState'


export default function SideNav() {
  const state = useContext(GlobalState)
  const [categories] = state.categoriesAPI.categories

  const [category, setCategory] = state.articleAPI.category
  const [sort, setSort] = state.articleAPI.sort
  const [search, setSearch] = state.articleAPI.search


  const handleCategory = e => {
      setCategory(e.target.value)
      setSearch('')
  }
  return (
    <>
      <div className="sidebar_container">
        <nav className="_nav">
          <ul>
            <li className="side_item_">
              <i className="fa fa-user" aria-hidden="true"></i>
              &nbsp;Technologies
            </li>
            {/* <li className="side_item_">
              <i className="fa fa-plane" aria-hidden="true"></i>&nbsp;sports news
            </li>
            <li className="side_item_">
              <i className="fa fa-apple" aria-hidden="true"></i>&nbsp;world news{" "}
            </li>
            <li className="side_item_">
              <i className="fa fa-android" aria-hidden="true"></i>&nbsp;scientific
              research{" "}
            </li>
            <li className="side_item_">
              <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;sidebar 1
            </li>
            <li className="side_item_">
              <i className="fa fa-car" aria-hidden="true"></i>&nbsp;sidebar 1
            </li>
            <li className="side_item_">
              <i className="fa fa-laptop" aria-hidden="true"></i>&nbsp;sidebar 1
            </li>
            <li className="side_item_">
              <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;sidebar 1
            </li>
            <li className="side_item_">
              <i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;sidebar 1
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}
