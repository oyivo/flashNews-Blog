import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Article() {
    const state = useContext(GlobalState)
    const [articles, setArticles] = state.articleAPI.articles
    


    return (
        <>
        <Filters />
        
        <div className="products">
            {
                articles.map(article => {
                    return <ProductItem key={article._id} article={article}
                     />
                })
            } 
        </div>

        <LoadMore />
        {articles.length === 0 && <Loading />}
        </>
    )
}

export default Article
