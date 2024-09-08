// App.js

import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();
  const logo =
    'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container-fluid bg-dark d-flex justify-content-center align-items-center vh-100">
      <img src={logo} alt="banner" />
      <div className="wrapper text-center">
        <h1 className="display-4 text-secondary mb-4">File Sharer</h1>
        <p className="mb-3">Upload the file to get a link!</p>
        <button className="btn btn-secondary mb-3" onClick={onUploadClick}>
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {result && (
          <a href={result} target="_blank" rel="noopener noreferrer">
            {result}
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
