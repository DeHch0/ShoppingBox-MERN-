import React, { Component, useEffect , useState } from 'react';
import getService from '../../../Getters/getProducts';
import ProductCard from '../../../ProductCard/index';
import ViewProduct from './ViewProduct';


const View = (logged) => {{
  const [posts, setPosts] = useState(null);
  const [isLogged, setIsLogged] = useState(logged.isLogged || false);

    useEffect(() => {
        let id = window.location.pathname.toString().split('/')[2];
        console.log(id);
        getService.load(`products/${id}`, 'GET').then(posts => {
        setPosts(posts)
    })}, [])

    return (
      <div className="container">
        {posts ? <div className="row" key='row1'>{<ViewProduct isLogged={isLogged} bucket={logged.bucket} {...posts}/>}</div> : <div>No Posts !</div>}
      </div>
    )
}}

export default View;