import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function BtnRender({article, deleteArticles}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin


    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteArticles(article._id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_article/${article._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                  
                </>
            }
                
        </div>
    )
}

export default BtnRender
