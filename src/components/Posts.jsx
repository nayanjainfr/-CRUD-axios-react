
import { useEffect } from 'react';
import { deletePost, getPosts, putPost } from '../api/Postapi';
import { useState } from 'react';

const Posts = () => {
    const [data, setData] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedPost,setupdatedPost] = useState({
        title: "",
        body: ""});

    const getData = async () => {
        try {
            const res = await getPosts();
            console.log(res);
            setData(res);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }

    }

    const handleDelete = async (id) => {
        try {
            await deletePost(id)
            setData(data.filter(post => post.id !== id))
        }
        catch(err){
            console.error('error deleting post',err)
        }
    }

    const handleEdit = async (post) =>{
        setEditingPost(post.id);
        setupdatedPost( {
            title: post.title,
            body: post.body})
    }

    const handleUpdate =async (id)=>{
        try{
            const  res = await putPost(id, updatedPost)
            setData(data.map(post => post.id === id ? res : post));
            setEditingPost(null);
        }catch(err){
            console.error(`Error updating post with id ${id}:`, err);
        }
    }
    

     

    useEffect(() => {
        getData()
    }, [])



    return (
        <>
            {data.map((post) => (
                <div key={post.id}>
                    {editingPost === post.id ? (
                        // Edit Mode
                        <div>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                placeholder="Update title"
                            />
                            <textarea
                                value={updatedBody}
                                onChange={(e) => setUpdatedBody(e.target.value)}
                                placeholder="Update body"
                            ></textarea>
                            <button onClick={() => handleUpdate(post.id)}>Save</button>
                            <button onClick={() => setEditingPost(null)}>Cancel</button>
                        </div>
                    ) : (
                        // View Mode
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <button onClick={() => handleEdit(post)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default Posts