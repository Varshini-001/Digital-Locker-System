import React, { useState, useEffect } from 'react';
import { getDocuments, viewDocument, deleteDocument } from '../api';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleView = async (id, filename) => {
    try {
      const response = await viewDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error('Error viewing document:', error);
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await viewDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        setDocuments(documents.filter(doc => doc.id !== id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="documents-container">
      <h2 className="documents-title">Document List</h2>
      {loading ? (
        <div>Loading documents...</div>
      ) : (
        <ul className="documents-list">
          {documents.map((doc, index) => (
            <li key={index} className="document-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '5px'}}>
                            <span 
                onClick={() => handleView(doc.id, doc.filename)}
                style={{cursor: 'pointer', flex: 1}}
                title="Click to view document"
              >
                {doc.name || doc.filename}
              </span>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <svg 
                  onClick={() => handleDownload(doc.id, doc.filename)}
                  style={{cursor: 'pointer', width: '20px', height: '20px'}}
                  title="Download document"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z"/>
                </svg>
                <svg 
                  onClick={() => handleDelete(doc.id)}
                  style={{cursor: 'pointer', width: '20px', height: '20px'}}
                  title="Delete document"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;