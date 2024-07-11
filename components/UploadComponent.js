import React, { useState } from 'react';

export default function UploadComponent() {
  const [file, setFile] = useState(null);
  const [container, setContainer] = useState('1');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContainerChange = (e) => {
    setContainer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('container', container);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('File uploaded successfully');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select File:
            <input type="file" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Select Container:
            <select value={container} onChange={handleContainerChange}>
              <option value="1">Container 1</option>
              <option value="2">Container 2</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
