import {useState, useEffect} from 'react'
import axios from 'axios'

export default function CommentsAPI() {
    const [comments, setComments] = useState([])

    useEffect(()=>{
        const getComments = async () => {
            const res = await axios.get('/api/comments')
            setComments(res.data.comments)
        }
        getComments()
    },[comments])

    return{
        comments: [comments, setComments]
    }
}
