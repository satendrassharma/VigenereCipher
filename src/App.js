import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

import vigenere from "./vigenere_ciper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("Satendra sharma");
  const [key, setKey] = useState("frontend");
  const [isEncrypt, setIsEncrypt] = useState(true);
  const outputRef = useRef(null);
  useEffect(() => {
    if (key.length > 0 && message.length > 0) {
      const cipherkey = vigenere.generatekey(message, key);
      const cipher = isEncrypt
        ? vigenere.encrypt(message, cipherkey)
        : vigenere.decrypt(message, cipherkey);
      console.log({ cipherkey, cipher, message, key });
      setOutput(cipher);
    }
  }, [key, message, isEncrypt]);

  const handleKey = (e) => {
    setKey(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleEncrypt = (e) => {
    setIsEncrypt(true);
  };

  const handleDecrypt = (e) => {
    setIsEncrypt(false);
  };

  const handleCopy = (e) => {
    outputRef.current.select();
    document.execCommand("copy");
    notify();
  };

  const notify = () =>
    toast("output copied", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  return (
    <div className="App">
      <h1>Vigenere Cipher</h1>

      <div className="options">
        <div>
          <input
            type="radio"
            name="option"
            checked={isEncrypt}
            onChange={handleEncrypt}
          />
          <span>encrypt</span>
        </div>

        <div>
          <input type="radio" name="option" onChange={handleDecrypt} />
          <span>decrypt</span>
        </div>
      </div>

      <div className="message_wrapper">
        <label htmlFor="mesasge">Message</label>
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={handleMessage}
        />
      </div>
      <div className="key_wrapper">
        <label htmlFor="key">Key</label>
        <input
          type="text"
          id="key"
          name="key"
          value={key}
          onChange={handleKey}
        />
      </div>
      <p className="outputmesasge">
        {isEncrypt ? "Encrypted Message" : "Decrypted Message"}
      </p>
      <div className="output_wrapper">
        <span className="copy" onClick={handleCopy}>
          copy
        </span>
        <textarea className="output" ref={outputRef} value={output}></textarea>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
