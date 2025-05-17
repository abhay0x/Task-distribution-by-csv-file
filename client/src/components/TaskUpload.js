import React, { useState } from 'react';

const TaskUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const allowedExtensions = ['csv', 'xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setMessage("Only CSV, XLSX, or XLS files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/upload-tasks', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Something went wrong.");
      }

    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file.");
    }
  };

  return (
      <React.Fragment>
                  <div class="navbar">
                  <div class="logo">Assignment</div>
                  <div> 
                      <a href="/Dashboard">Dashboard</a>
                      <a href="/agent">add agent</a>
                      
                  </div>
                  <div class="auth-buttons">
                     
                  </div>
                  </div>
             
    <div style={{ padding: '20px' }}>
      <h2>Upload Tasks CSV</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: '10px' }}>Upload</button>
      </form>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
    </React.Fragment>
  );
};

export default TaskUpload;





