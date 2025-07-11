import { useEffect, useState } from 'react';
import { deletePost, getPosts, putPost } from '../api/Postapi';


const Posts = () => {
    const [data, setData] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedPost, setupdatedPost] = useState({
        title: "",
        body: ""
    });
    const [searchvalue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const [filterUserId, setFilterUserId] = useState("");
    const [uniqueUserIds, setUniqueUserIds] = useState([]);
    const [filteredData, setFilteredData] = useState([])


    useEffect(() => {
    const getData = async () => {
        try {
            const res = await getPosts();
            console.log(res);
            setData(res);
            setSearchResults(res); 
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    }
        getData();
    }, []);

    useEffect(() => {
        if(data)
        {
            const userIds = data.map(post => post.userId);
            const uniqueIds = [...new Set(userIds)];
            console.log(uniqueIds);
            setUniqueUserIds(uniqueIds);
        }
    }, [data])
    

    const handleChange = (e) => {
        setupdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    }


    const handleDelete = async (id) => {
        try {
            await deletePost(id)
            setData(data.filter(post => post.id !== id))
            setSearchResults(searchResults.filter((post) => post.id !== id));
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

    const handleSearch = () => {
        if (searchvalue.trim() === "") {
            setSearchResults(data)
        }
        else {
            const searchResult = data.filter(post => 
                post.title.toLowerCase().includes(searchvalue.toLowerCase())
        )
            setSearchResults(searchResult)
        }
    }


    useEffect(() => {
        if(data)
        {
            const arr = data.filter((post)=>post.userId==filterUserId)
            console.log('arr data',arr);
            setFilteredData(arr)    
        }
    }, [filterUserId])
    


    return (
        <> <div>
            <input
                type='text'
                placeholder='serach by title'
                value={searchvalue}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
                style={{
                    padding: "10px", width: "400px", height: "25px", fontSize: "20px", borderRadius: "4px",
                    border: "1px solid #ddd"
                }}

            />
         

            <button onClick={handleSearch}>Search</button>

            <select
            value={filterUserId}
            onChange={(e)=>setFilterUserId(e.target.value)}
            style={{
                padding: "5px",
                height: "30px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ddd"
            }}
            >
                <option value="">Filter By UserId</option>
                {uniqueUserIds?.map((userId)=>(
                    <option key={userId} value={userId}>
                       user : {userId}
                    </option>
                ))}
            </select>
        </div>
            {( searchvalue ? searchResults: filteredData.length>0? filteredData:data).map((post) => (
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

                        <div style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            margin: "10px 0",
                            borderRadius: "4px",
                            backgroundColor: "grey"}}
                            >

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