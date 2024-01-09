import React, { useState } from 'react';
import Feed from './Feed';
import Profile from './Profile';
import NewPostModal from './NewPostModal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("defaultUserId"); // Placeholder for user ID

  // Function to toggle the New Post Modal
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Hindsite</h1>
        <button onClick={toggleModal} className="btn btn-primary">
          Create New Post
        </button>
      </header>
      <main>
        {/* Example of Feed Component */}
        <Feed />

        {/* Example of Profile Component */}
        {/* Uncomment to use: <Profile userId={currentUserId} /> */}

        {/* New Post Modal */}
        <NewPostModal show={showModal} onClose={toggleModal} />
      </main>
    </div>
  );
};

export default App;

