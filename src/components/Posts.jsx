import React, { useEffect } from 'react'
import { getPosts } from '../api/Postapi';

const Posts = () => {
    const [data, setData] = useState([]);

    const getPostData = async ()=>{
        const res = await getPosts()
        console.log(res.data)
        setData(res.data)
    }


    useEffect(()=>{
        getPostData()
    },[])

    

  return (
    <div></div>
  )
}

export default Posts