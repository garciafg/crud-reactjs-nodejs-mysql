import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";



const Post = (props) => {

    const [post, setPost] = useState({});

    useEffect(() => {
    async function getPosts(){
        let res = await api.get(`/api/post/${props.match.params.id}`);
        setPost(res.data.ok)
        
    }
    getPosts();
},[ ])


    return(
        <>

            <main>
                <section className="container main01 bg-white pt-5 mt-5">
                    
                <div className="postagens p-1 pt-5">
                        <div className="card">
                            <div className="card-header"><h1>{post.title}</h1></div>
                            <div className="card-body">
                            
                                <div className="card" key="1">
                                    <div className="card-header">
                                    </div>
                                    <div className="card=bod">
                                        <h4><Link to="/login" className=" posts-home">ssasds</Link></h4>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                </section>
            </main>

        </>
    )
}

export default Post;