import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export const getPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting post with id ${id}:`, error);
        throw error;
    }
};

export const postData = async (post) => {
    try {
        const response = await api.post("/posts", post);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const putPost = async (id, post) => {
    try {
        const response = await api.put(`/posts/${id}`, post);
        return response.data;
    } catch (error) {
        console.error(`Error updating post with id ${id}:`, error);
        throw error;
    }
};