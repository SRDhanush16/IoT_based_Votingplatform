// is the actuall login page

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import usersdb from "../Dbdb"; 
import Rankingspace from "../Ranking/Rankingspace";

const Login = () => {

  const [loginStatus, setLoginStatus] = useState(null);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [enteredId, setEnteredId] = useState("");
  const [error, setError] = useState("");

  // do not touch this 
  useEffect(() => {
    // needed for connection btw sensor n backend
    const ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    ws.onmessage = (event) => {
      console.log("Received data from server:", event.data);
      const message = event.data.trim();
      if (message !== "No finger detected" && 
          message !== "Image taken" && 
          message !== "Image converted") {
        toast.info(message);
      }
      // Extract ID from the received response
      const foundIdPattern = /Found ID #(\d+)/;
      const foundIdMatch = message.match(foundIdPattern);
      if (foundIdMatch) {
        const foundId = foundIdMatch[1];
        const username = usersdb[foundId];
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

  //triggered when fingerprint is kept 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!enteredId) {
      setError("Error in logging in ");
      return;
    }
  };

  return (
    <>
       
          {loginStatus ? (
            <>
              <h1>REVIVE</h1> 
              <div className="nav-bar">
                <h2>Name: {fingerprintData.username} <strong> |  UserID: </strong> {fingerprintData.fingerprint_id} </h2>
              </div>
              <Rankingspace/>
              <footer><p>All rights reserved &copy; by DJPA</p></footer>
            </>
          ) : ( 
            <>
              {/* login page start from here */}
              <h1 className="website-header" >TOP 10 PLACES TO VISIT IN CHENNAI</h1>
              <div className="login-container" >
                <p>Please authenticate your identity by placing your finger on the fingerprint sensor to proceed with signing in.</p> 
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    name="id"
                    id="id"
                    value={enteredId}
                    onChange={(e) => setEnteredId(e.target.value)}
                    // autoComplete="off"
                    required
                  />
                  {error && <p className="error">{error}</p>} 
                </form>
              </div>
              <footer><p>All rights reserved &copy; by DJPA</p></footer>
              
            </>
          )}
       
    </>
  );
};

export default Login;
