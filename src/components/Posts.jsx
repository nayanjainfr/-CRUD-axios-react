
import { useEffect, useState } from 'react';
import { deletePost, getPosts, putPost } from '../api/Postapi';


const Posts = () => {
    const [data, setData] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedPost, setupdatedPost] = useState({
        title: "",
        body: ""
    });

    const getData = async () => {
        try {
            const res = await getPosts();
            console.log(res);
            setData(res);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }

    }

    const handleChange = (e) => {
        setupdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    }


    const handleDelete = async (id) => {
        try {
            await deletePost(id)
            setData(data.filter(post => post.id !== id))
        }
        catch (err) {
            console.error('error deleting post', err)
        }
    }

    const handleEdit = (post) => {
        setEditingPost(post.id);
        setupdatedPost({
            title: post.title,
            body: post.body
        })
    }

    const handleUpdate = async (id) => {
        try {
            const res = await putPost(id, updatedPost)
            setData(data.map(post => (post.id === id ? res : post)));
            setEditingPost(null);
        } catch (err) {
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

                        <div>
                            <input style={{
                                padding: "10px", width: "400px", height: "60px", fontSize: "20px", borderRadius: "4px",
                                border: "1px solid #ddd"
                            }}
                                type="text"
                                name='title'
                                value={updatedPost.title}
                                onChange={handleChange}
                                placeholder="Update title"
                            />
                            <br />
                            <textarea
                                style={{
                                    padding: "10px", width: "700px", height: "60px", fontSize: "20px", borderRadius: "4px",
                                    border: "1px solid #ddd"
                                }}

                                value={updatedPost.body}
                                onChange={handleChange}
                                placeholder="Update body"
                                name='body'
                            ></textarea>
                            <button onClick={() => handleUpdate(post.id)}>Save</button>
                            <button onClick={() => setEditingPost(null)}>Cancel</button>
                        </div>
                    ) : (

                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <button style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }} onClick={() => handleEdit(post)}>Edit</button>
                            
                            
                            <button style={{
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }} onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default Posts