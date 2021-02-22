import React, {useContext} from "react";
import {GlobalState} from '../../GlobalState'

export default function SearchBox() {

  const state = useContext(GlobalState)
  const [search, setSearch] = state.articleAPI.search
  
  return (
    <>
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value.toLowerCase())}
      />
    </>
  );
}