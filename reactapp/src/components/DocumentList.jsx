import React, { useState, useEffect } from 'react';
import { getDocuments } from '../api';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="documents-container">Loading documents...</div>;
  }

  return (
    <div className="documents-container">
      <h2 className="documents-title">Document List</h2>
      <ul className="documents-list">
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            {doc.name || doc.filename}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;