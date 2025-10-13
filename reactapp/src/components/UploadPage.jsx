import React, { useState } from 'react';
import { uploadDocument } from '../api';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setMessage('Uploading...');
    
    try {
      console.log('Uploading file:', file.name);
      const response = await uploadDocument(file);
      console.log('Upload response:', response);
      setMessage('Document uploaded successfully!');
      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        setMessage('Network error. Please check your connection.');
      } else {
        setMessage('Error uploading document. Please try again.');
      }
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          required
        />
        <button type="submit" className="upload-btn-submit">
          Upload Document
        </button>
      </form>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadPage;