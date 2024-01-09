import React, {useState} from 'react';
import defaultProfilePic from './assets/default_profile_pic.jpg';
import './Post.css';

const Post = ({ post }) => {
    const [ratings, setRatings] = useState(post.ratings);

  // Function to handle rating
  const handleRating = (rating) => {
    fetch(`http://localhost:3000/posts/${post._id}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating })
    })
    .then(response => response.json())
    .then(updatedPost => {
      console.log('Post updated:', updatedPost);
      // You can add logic here to update the UI with the new rating
      setRatings(updatedPost.ratings); // Update the ratings state
    })
    .catch(error => console.error('Error updating post:', error));
  };

  const calculateRatingPercentages = () => {
    const totalVotes = ratings.wrong + ratings.neutral + ratings.correct;
    if (totalVotes === 0) return { wrong: 0, neutral: 0, correct: 0 };
  
    return {
      wrong: (ratings.wrong / totalVotes) * 100,
      neutral: (ratings.neutral / totalVotes) * 100,
      correct: (ratings.correct / totalVotes) * 100,
    };
  };
  

  const ratingPercentages = calculateRatingPercentages();

  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* User's profile image and username */}
        <div className="d-flex align-items-center mb-3">
          {/* Placeholder for profile image */}
          <img src={defaultProfilePic} alt="Default Profile Pic" className="profile-pic" />
          <strong>{post.username}</strong>
        </div>
        
        {/* Post content */}
        <p>{post.content}</p>
        
        {/* Post dates */}
        <p>Composed: {new Date(post.composedAt).toLocaleString()}</p>
        <p>Scheduled: {new Date(post.scheduledTime).toLocaleString()}</p>
        
        {/* Rating bar */}
        <div className="ratings-bar" style={{ display: 'flex', height: '15px',}}>
            <div style={{ width: `${ratingPercentages.wrong}%`, backgroundColor: 'red' }}></div>
            <div style={{ width: `${ratingPercentages.neutral}%`, backgroundColor: 'gray' }}></div>
            <div style={{ width: `${ratingPercentages.correct}%`, backgroundColor: 'green' }}></div>
        </div>
        
        {/* Rating options */}
        <button className="btn btn-danger" onClick={() => handleRating('wrong')}>Wrong</button>
        <button className="btn btn-secondary" onClick={() => handleRating('neutral')}>Neutral</button>
        <button className="btn btn-success" onClick={() => handleRating('correct')}>Correct</button>
        </div>
    </div>
  );
};

export default Post;
