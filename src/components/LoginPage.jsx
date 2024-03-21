// never used , just for back up/reference , so dont bother

import React, { useState, useEffect } from "react";
import { ExitToApp } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(){
  const [loginStatus, setLoginStatus] = useState(null);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [enteredId, setEnteredId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log("Received data from server:", event.data);

      const message = event.data.trim();

      if (message !== "No finger detected" && 
          message !== "Image taken" && 
          message !== "Image converted" &&
          message !== "Unknown error" ) {
        toast.info(message);
      }

      // Extract ID from the received response
      const foundIdPattern = /Found ID #(\d+)/;
      const foundIdMatch = message.match(foundIdPattern);

      if (foundIdMatch) {
        const foundId = foundIdMatch[1];
        const usernames = {
          1: "Prashanth",
          2: "Dhanush",
          3: "Jayanth",
          5: "Ajay",
        };
        const username = usernames[foundId];

        setFingerprintData({
          fingerprint_id: foundId,
          username: username,
        });
        setLoginStatus(true);
        setError("");
      }
    };
    
    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!enteredId) {
      setError("Please enter an ID number.");
      return;
    }
  };

  const handleLogout = () => {
    setLoginStatus(null);
    setFingerprintData(null);
    setEnteredId("");
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="auth">
          {loginStatus ? (
            <>
              <h1>Welcome</h1>
              <div className="fingerprint-info">
                <p><strong>Fingerprint ID:</strong> {fingerprintData.fingerprint_id}</p>
                <p><strong>Username:</strong> {fingerprintData.username}</p>
              </div>
            </>
          ) : (
            <>
              <h1>Fingerprint Sign-in</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  name="id"
                  id="id"
                  value={enteredId}
                  onChange={(e) => setEnteredId(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter ID"
                  required
                />
                {error && <p className="error">{error}</p>}
                <p>Please authenticate your identity by placing your finger on the fingerprint sensor to proceed with signing in.</p>
              </form>
            </>
          )}
        </div>
      </section>
      {loginStatus && (
        <button className="logout-button" onClick={handleLogout}>
          <ExitToApp />
        </button>
      )}
    </>
  );
};

export default LoginPage;
