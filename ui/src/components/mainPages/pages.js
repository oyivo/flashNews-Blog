import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from './utils/notFound'
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./home/home";
import dashboard from "./adminPage/dashboard";
import CreateArticle from './createArticle/CreateArticle'
//import Categories from './categories/Categories'

import { GlobalState } from "../../GlobalState";
import ReadMore from "./readmore/ReadMore";

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/read/:id" exact component={isLogged ? ReadMore : Login} />

        <Route path="/login" exact component={isLogged ? NotFound : Login} />
        <Route path="/register" exact component={isLogged ? NotFound : Register} />

        {/* <Route path="/category" exact component={isAdmin ? Categories : NotFound} /> */}
        <Route path="/create_article" exact component={isAdmin ? CreateArticle : NotFound} />
        <Route path="/edit_article/:id" exact component={isAdmin ? CreateArticle : NotFound} />
        <Route path="/dashboard" exact component={isAdmin ? dashboard : NotFound} />


        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default Pages;
