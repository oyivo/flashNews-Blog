import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import Loading from '../utils/loading/Loading'

const initialState = {
  article_id: "",
  author: "",
  title: "",
  content: "",
  category: "",
  _id: "",
};

function CreateArticle() {
  const state = useContext(GlobalState);
  const [article, setArticle] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false)

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [articles] = state.articleAPI.articles;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.articleAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      articles.forEach((article) => {
        if (article._id === param.id) {
          setArticle(article);
          setImage(article.image)
        }
      });
    } else {
      setOnEdit(false);
      setArticle(initialState);
      setImage(false)
    }
  }, [param.id, articles]);

  const handleUpload = async e =>{
    e.preventDefault()
    try {
        if(!isAdmin) return alert("You're not an admin")
        const file = e.target.files[0]
        
        if(!file) return alert("File not exist.")

        let formData = new FormData()
          formData.append('file', file)

          console.log(file)

       // setLoading(true)
        const res = await axios.post('/api/upload', formData, {
            headers: {'content-type': 'multipart/form-data', Authorization: token}
        })
        //setLoading(false)
        console.log(res.data)
        setImage(res.data.img)
        console.log(image)
        //setImages(res.data)

    } catch (err) {
        alert(err.response.data.msg)
    }
}

const handleDestroy = async () => {
    try {
        if(!isAdmin) return alert("You're not an admin")
        setLoading(true)
        await axios.post('/api/destroy', {public_id: image.public_id}, {
            headers: {Authorization: token}
        })
        //setLoading(false)
        setImage(false)
    } catch (err) {
        alert(err.response.data.msg)
    }
}

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      // if(!images) return alert("No Image Upload")


      if (onEdit) {
        await axios.put( `/api/articles/${article._id}`,
          { ...article, image },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/articles",
          { ...article, image },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none"
}

  return (
    <div className="create_product">
         <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    // loading ? <div id="file_img"><Loading /></div>
                    //: tenary 
                    <div id="file_img" style={styleUpload}>
                        <img src={image} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="article_id">Article ID</label>
          <input
            type="text"
            name="article_id"
            id="title"
            value={article.article_id}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="title"
            value={article.author}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={article.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={article.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={article.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateArticle;
