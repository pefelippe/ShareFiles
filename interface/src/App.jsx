import React, { useEffect, useState } from "react";

import api from "./api";

const baseUrl = "";

function App() {
  const [sendFile, setSendFile] = useState();
  const [files, setFiles] = useState();

  const handleInput = () => {
    var imagefile = document.querySelector("#file");
    setSendFile(imagefile.files[0]);
  };

  const handleBtn = () => {
    const formData = new FormData();
    formData.append("file", sendFile);
    api.post(baseUrl + "/upload", formData);
  };

  const handleDownloadFile = async (namefile) => {
    const formData = new FormData();
    formData.append("namefile", namefile);

    return await api(baseUrl + `/download/${namefile}`, {
      responseType: "blob",
    }).then((r) => {
      let url = window.URL.createObjectURL(r.data);
      let a = document.createElement("a");
      a.href = url;
      a.download = namefile;
      a.click();
    });
  };

  useEffect(() => {
    async function fetchData() {
      await api(baseUrl + "/files")
        .then((res) => res.data)
        .then((data) => {
          setFiles(data);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <section>
        <h1>File Manager</h1>
        <input type="file" id="file" onChange={handleInput} />
        <button type="submit" className="btn" onClick={handleBtn}>
          Upload
        </button>
      </section>

      <section>
        <h1>Download from database</h1>
        {files
          ? files.map((file) => {
              return (
                <div key={file}>
                  <li>
                    {file}
                    <button onClick={() => handleDownloadFile(file)}>
                      Download
                    </button>
                  </li>
                </div>
              );
            })
          : "Sem Arquivos no database"}
      </section>
    </div>
  );
}

export default App;
