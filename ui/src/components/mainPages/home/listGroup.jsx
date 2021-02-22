import React, {useContext} from "react";
import {GlobalState} from '../../../GlobalState'


export default function ListGroup() {
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
     <ul className="list-group list-group-flus _list_custom_opacity">
         <li className="list-group-item _list_custom">&nbsp;&nbsp;Filter Your Feeds
         <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Article</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
         </li>
         <li className="list-group-item _list_custom"><input type="checkbox"/>&nbsp;&nbsp;Upvote 5 more good answers</li>
         <li className="list-group-item _list_custom"><input type="checkbox"/>&nbsp;&nbsp;Ask a question</li>
         <li className="list-group-item _list_custom"><input type="checkbox"/>&nbsp;&nbsp;Add 3 credentials about where you live</li>
         <li className="list-group-item _list_custom"><input type="checkbox"/>&nbsp;&nbsp;Answer a questions</li>
         <li className="list-group-item _list_custom"><input type="checkbox"/>&nbsp;&nbsp;cars and planes</li>
     </ul>
    </>
  );
}
