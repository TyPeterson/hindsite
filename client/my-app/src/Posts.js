import React, { useState, useEffect } from 'react';
import Post from './Post';


const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('http://localhost:3000/posts') // Adjust this if your API URL is different
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  useEffect(() => {
    fetchPosts();

    // Polling: refetch posts every 30 seconds
    const intervalId = setInterval(fetchPosts, 30000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};


export default Posts;
