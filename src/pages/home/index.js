import React, { useEffect, useState }  from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";



const Home  = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
    async function getPosts(){
        let res = await api.get("/api/posts");
        setPosts(res.data.posts)
    }
    getPosts();
},[ ])


const [categories, setCategories] = useState([]);
useEffect(() => {
async function getCategories(){
    let res = await api.get("/api/cat");
    setCategories(res.data.cat)
}
getCategories();
},[ ])


    return(
        <>  
            <main>
                <section className="container main01 bg-white pt-5 mt-5">
                    <div className="postagens p-1 pt-5">
                        <div className="card">
                            <div className="card-header"><h1>Postagens</h1></div>
                            <div className="card-body">
                            {posts?.map(post => (
                                <div className="card" key={post.id}>
                                    <div className="card-header"><span className="badge bg-danger"><h6>{post.tbl_categoria.titulo}</h6></span>
                                    </div>
                                    <div className="card=bod">
                                        <h4><Link to={`/post/${post.id}`} className=" posts-home">{post.title}</Link></h4>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="categorias pt-5">
                        <div className="card">
                            <div className="card-header"><h3>Categorias</h3></div>
                            <div className="card-body">
                                <ul>
                                    {categories?.map(category => (
                                        <li key={category.id}><h5>{ category.titulo }</h5></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>

    )
}

export default Home;