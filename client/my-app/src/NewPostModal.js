import React, { useState } from 'react';

const NewPostModal = ({ show, onClose }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit the new post
    console.log(content); // For now, just log the content
    onClose(); // Close the modal after submission
  };

  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Post</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                />
              </div>
              <button type="submit" className="btn btn-primary">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
