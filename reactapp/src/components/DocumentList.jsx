import React, { useState, useEffect } from 'react';
import { getDocuments, viewDocument, deleteDocument } from '../api';

const getFileIcon = (filename) => {
  if (!filename) return '📄';
  if (filename.endsWith('.pdf')) return '📕';
  if (filename.endsWith('.doc') || filename.endsWith('.docx')) return '📘';
  if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) return '📗';
  if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return '🖼️';
  return '📄';
};

const getMimeType = (filename) => {
  if (!filename) return 'application/octet-stream';
  if (filename.endsWith('.pdf')) return 'application/pdf';
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  if (filename.endsWith('.txt')) return 'text/plain';
  if (filename.endsWith('.doc')) return 'application/msword';
  if (filename.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (filename.endsWith('.xls')) return 'application/vnd.ms-excel';
  if (filename.endsWith('.xlsx')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  return 'application/octet-stream';
};

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOfficeFile = (filename) => filename && (
    filename.endsWith('.doc') || filename.endsWith('.docx') ||
    filename.endsWith('.ppt') || filename.endsWith('.pptx') ||
    filename.endsWith('.xls') || filename.endsWith('.xlsx')
  );

  const handleView = async (id, filename) => {
    try {
      const response = await viewDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data], { type: getMimeType(filename) }));
      if (isOfficeFile(filename)) {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        window.open(url, '_blank');
      }
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error('Error viewing document:', error);
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await viewDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data], { type: getMimeType(filename) }));
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
      <div className="documents-header">
        <h2 className="documents-title">My Documents</h2>
        {!loading && <span className="documents-count">{documents.length} files</span>}
      </div>
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No documents uploaded yet</p>
        </div>
      ) : (
        <ul className="documents-list">
          {documents.map((doc) => (
            <li key={doc.id} className="document-item">
              <div className="doc-icon">{getFileIcon(doc.filename)}</div>
              <div className="doc-info">
                <span className="doc-name" onClick={() => handleView(doc.id, doc.filename)} title="Click to view">
                  {doc.filename}
                </span>
              </div>
              <div className="doc-actions">
                <button className="action-btn" title="Download" onClick={() => handleDownload(doc.id, doc.filename)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z"/>
                  </svg>
                </button>
                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(doc.id)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
