import React, { useEffect, useState, useRef } from "react";
import GlobalStyleAdmin from "../styles/styled";
import api from "../../../services/api";
import { Modal } from 'bootstrap'
import {toast} from 'react-toastify';


const AdminIndex = () => {

    //  atualizador tabelas
    const [refreshKey, setRefreshKey] = useState(0)

    /*
    * Constantes da categoria
    */
    const [modal, setModal] = useState(null);
    const [modalEditCat, setModalEditCat] = useState(null);

    const categoriaModal = useRef();
    const editCatModal = useRef();

    const [categories, setCategories] = useState([]);
    /*
    * Fim constantes categoria
    */

    /*
    * Constantes das postagens 
    */
    const [modalPost, setModalPost] = useState(null)
    const [modalEditPost, setModalEditPost] = useState(null);
    const postModal = useRef();
    const editPostModal = useRef();

    const [posts, setPosts] = useState([]);
    /*
    * Fim constantes postagens 
    */

    /*
    * Effects categorias
    */
    useEffect(() => {
        setModal(
          new Modal(categoriaModal.current)
        )
      }, []);
      
    useEffect(() => {
        setModalEditCat(
          new Modal(editCatModal.current)
        )
      }, []);


      useEffect(() => {
        async function fetchData() {
            let res = await api.get('/api/cat');
            setCategories(res.data.cat);
        }
        fetchData()
    }, [refreshKey]);
    /*
    * Fim Effects categorias
    */
    
    /*
    * Effects postagens
    */
    useEffect(() => {
        api.get("/api/posts").then((res) => {
            setPosts(res.data.posts)
        }).catch((err) => {
            setPosts()
        });
    }, [refreshKey])

    useEffect(() => {
        setModalPost(
          new Modal(postModal.current)
        )
      }, []);

    useEffect(() => {
        setModalEditPost(
          new Modal(editPostModal.current)
        )
    }, []);
    /*
    * Fim Effects postagens
    */ 
    
        // Recebe dados digitados no formulario e cadastra a categoria
        const [cat, setCat] = useState([]);
        function handleSubmitCat(){
            async function addCat() {

                let res = await api.post('/api/cat/add', { cat: cat });
                let data = res.data;
                    if(data.ok){
                        console.log("Msg sucesso: "+data.ok)
                        toast.success(data.ok)
                        setTimeout(() => {
                            setRefreshKey(oldKey => oldKey +1);
                        }, 1000)
                    }else{
                        console.log("Msg de erro: "+ data.err)
                        toast.error(data.err,{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                }
        
                addCat();
                modal.hide();
        }

        // Nome da categoria para edição
        const [idEdit, setCatIdEdit] = useState('');
        const [catEdit, setCatEdit] = useState('');
        

        // Busca a categoria a ser editada
        function handleGetCatEdit(id){
            api.get(`/api/cat/getEdit/${id}`).then((res) => {
                let data = res.data;
                if(data.ok){
                    setCatEdit(data.ok.titulo);
                    setCatIdEdit(data.ok.id);
                    modalEditCat.show();
                }else{
                    console.log("Msg de erro: "+data.err);
                }
            }).catch((err) =>{
                console.log("Erro ao requisitar dados");
            })
        }

        //  Envia categoria editada para ser salva
        function handleSubmitCatEdit(e){
            e.preventDefault();
            async function addCatEdit() {
                let res = await api.post('/api/cat/update', { id: idEdit ,titulo: catEdit });
                let data = res.data;
                    if(data.ok){
                        toast.success(data.ok)
                    }else{
                        toast.error(data.err,{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                }
                addCatEdit();
                setTimeout(() =>{
                    modalEditCat.hide();
                    setRefreshKey(oldKey => oldKey +1)  
                }, 1000)
                  
        }
        
            function handleDeleteCat(id){ 
                if (!window.confirm("Deseja realmente excluir essa categoria?")) return;      
                api.post(`/api/cat/delete/${id}`).then((res) => {
                    if(res.data.ok){
                        toast.success(res.data.ok);
                        setTimeout(() => {
                            setRefreshKey(oldKey => oldKey +1);
                        }, 1000)
                    }else{
                        toast.success(res.data.err)
                    }
                }).catch((err) => {
                    console.log("Erro")
                })
        }

        /*
        * Postagens 
        */
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [postCat, setPostCat] = useState('');
    

    function handleSubmitPost(e){
        e.preventDefault();
        
        async function submitPost(){

            let res = await api.post('/api/post/add', { titulo: titulo, conteudo: conteudo, cat: postCat });

            if(res.data.ok){
                toast.success(res.data.ok);
                setTimeout(() => {
                    modalPost.hide();
                    setRefreshKey(oldKey => oldKey +1);
                }, 1000)
            }else{
                toast.error(res.data.err);
            }

        }
        submitPost();
    }

    const [postIdEdit, setPostIdEdit] = useState();
    const [postTitleEdit, setPostTitleEdit] = useState('');
    const [postContEdit, setPostContEdit] = useState('');
    const [postCatCatEdit, setPostCatCatEdit] = useState('');
    function handleGetPostEdit(id){
        
        async function getPost(){

            let res = await api.get(`/api/post/getEdit/${id}`);

            if(res.data.ok){
                setPostIdEdit(res.data.ok.id)
                setPostTitleEdit(res.data.ok.title);
                setPostContEdit(res.data.ok.conteudo);
                setPostCatCatEdit(res.data.ok.tblCategoriaId)
                modalEditPost.show();

            }else{

                console.log(res.data.err);

            }

        }

        getPost();

    }

 
    function handleSubmitPostEdit(e){

        e.preventDefault();

        async function editPost() {
 
            let res = await api.post("/api/post/edit", { id: postIdEdit, titulo: postTitleEdit, conteudo: postContEdit, cat: postCatCatEdit });

            if(res.data.ok){

                toast.success(res.data.ok);
                setTimeout(() => {
                    modalEditPost.hide();
                    setRefreshKey(oldKey => oldKey +1);
                }, 1000)

            }else{
                toast.error(res.data.err);
            }
            
        }
        editPost();
    }
    return(
        <>
            <section>
                <div className="container box-home-admin01 bg-white">
                    <h2 className="ms-5">Administrar postagens</h2>
                </div>
                <div className="container box-home-admin02 bg-white shadow">
                    <div className="coluna-left shadow">
                        <div className="card">
                            <div className="card-header shadow d-flex flex-row justify-content-between">
                                <h3>Postagens</h3>
                                <button onClick={() => modalPost.show()} className="btn btn-success btn-sm">Adicionar post</button>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-hover">
                                      <thead>
                                        <tr>
                                            <th scope="col">Post</th>
                                            <th scope="col"></th>
                                            <th className="text-center" scope="col">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts?.map(post => (
                                            <tr key={post.id}>                                        
                                                <td colSpan="2"><b>{post.title}</b></td>
                                                <td className="text-center"><button onClick={() => handleGetPostEdit(post.id)} className="btn btn-warning btn-sm">Editar</button> <button className="btn btn-danger btn-sm">Deletar</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="coluna-right shadow">
                        <div className="card">
                            <div className="card-header shadow d-flex flex-row justify-content-between">
                                <h3>Categorias</h3>
                                <button onClick={() => modal.show()} className="btn btn-success btn-sm">Adicionar categoria</button>
                            </div>
                            <div className="card-body">

                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Post</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th className="text-center" scope="col">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {categories.map(category => (   
                                        <tr key={category.id}>
                                            <td colSpan="3"><h6>{category.titulo}</h6></td>
                                            <td className="text-center"><button onClick={() => {handleGetCatEdit(category.id)}} className="btn btn-warning btn-sm">Editar</button> <button onClick={() => handleDeleteCat(category.id)} className="btn btn-danger btn-sm">Deletar</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>


                {/* Modal Adicionar categoria */}
                <div  className="modal fade " ref={categoriaModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        
                            <div className="card">
                                <div className="card-header">
                                    <h3>Adicionar categoria</h3>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <label htmlFor="categoria" className="me-3 fs-5">Nome da categoria</label>
                                        <input 
                                        type="text" 
                                        name="categoria" 
                                        id="categoria" 
                                        value={cat} 
                                        onChange={event => {setCat(event.target.value)}} />
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => modal.hide()}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmitCat}>Cadastrar</button>
                        </div>
                    </div>
                    </div>
                </div>


                {/* Modal editar categoria*/}
                <div  className="modal fade " ref={editCatModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={() => modalEditCat.hide()} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitCatEdit}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Editar categoria</h3>
                                        </div>
                                        <div className="card-body">  
                                            <label htmlFor="categoria" className="me-3 fs-5">Nome da categoria</label>
                                            <input 
                                            type="text" 
                                            name="categoria" 
                                            value={catEdit}
                                            onChange={event => {setCatEdit(event.target.value)}} />   
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => modalEditCat.hide()}>Cancelar</button>
                                            <input type="submit" value="Editar" className="btn btn-primary ms-2" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal adicionar postagem*/}
                <div  className="modal fade " ref={postModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={() => modalPost.hide()} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitPost}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Adicionar postagem</h3>
                                        </div>

                                        
                                            <div className="mb-3">
                                                <label htmlFor="titulo" className="form-label">Titulo</label>
                                                <input 
                                                type="text" 
                                                className="form-control"
                                                value={titulo}
                                                onChange={event => {setTitulo(event.target.value)}}
                                                id="titulo" 
                                                aria-describedby="titulo" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="conteudo" className="form-label">Conteúdo</label>
                                                <textarea
                                                value={conteudo}
                                                onChange={event => {setConteudo(event.target.value)}}
                                                className="form-control" 
                                                placeholder="Conteúdo " 
                                                id="conteudo"></textarea>
                                            </div>
                                            <div className="mb3">
                                                <select className="form-control" name="nivel" id="optionNivel" value={postCat} onChange={event => setPostCat(event.target.value)} >
                                                    <option  value="" defaultValue disabled hidden>Selecione categoria</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.titulo}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => modalPost.hide()}>Cancelar</button>
                                            <input type="submit" value="Cadastrar" className="btn btn-primary ms-2" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal editar postagem */}
                <div  className="modal fade " ref={editPostModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={() => modalEditPost.hide()} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitPostEdit}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Editar postagem</h3>
                                        </div>
                                        
                                            <div className="mb-3">
                                                <label htmlFor="titulo" className="form-label">Titulo</label>
                                                <input 
                                                type="text" 
                                                className="form-control"
                                                value={postTitleEdit}
                                                onChange={event => {setPostTitleEdit(event.target.value)}}
                                                id="titulo" 
                                                aria-describedby="titulo" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="conteudo" className="form-label">Conteúdo</label>
                                                <textarea
                                                value={postContEdit}
                                                onChange={event => {setPostContEdit(event.target.value)}}
                                                className="form-control" 
                                                placeholder="Conteúdo " 
                                                id="conteudo"></textarea>
                                            </div>
                                            <div className="mb3">
                                                <select className="form-control" name="nivel" id="optionNivel" value={postCatCatEdit} onChange={event => setPostCatCatEdit(event.target.value)} >
                                                    <option  value="" defaultValue disabled hidden>Selecione categoria</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.titulo}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => modalEditPost.hide()}>Cancelar</button>
                                            <input type="submit" value="Editar" className="btn btn-primary ms-2" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>

                <GlobalStyleAdmin />
            </section>
        </>
    )

}

export default AdminIndex;