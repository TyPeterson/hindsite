import React, { useState, useEffect } from 'react';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user information
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));

    // Fetch posts by the user
    fetch(`http://localhost:3000/posts?user=${userId}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [userId]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      {/* Display user's posts */}
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
