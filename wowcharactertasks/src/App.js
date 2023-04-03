import './App.css';
import React, { useState } from "react";
import LoginStatus from './components/LoginStatus.jsx';
import Character from './components/Character.jsx';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('loggedOut');
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(0);
  const [charactersShown, setCharactersShown] = useState(false);

  function usernameSet(user) {
    setUsername(user);
  }
  function userIDSet(id) {
    setUserID(id);
  }
  function characterShownSet() {
    setCharactersShown(true);
  }
  function changeLoginButton(value) {
    if (loggedInStatus === 'loggedOut') {
      setLoggedInStatus('loggingIn');
    }
    else if (loggedInStatus === 'loggingIn') {
      setLoggedInStatus('loggedIn');
    }
    else {
      setLoggedInStatus('loggedOut');
    }
  }
  return (
    <div className="App">
      <LoginStatus
      loggedInStatus = {loggedInStatus}
      changeLoginButton = {changeLoginButton}
      username = {username}
      usernameSet = {usernameSet}
      userIDSet = {userIDSet}
      />
      <header className="App-header">
        <p>
          World of Warcraft Character Tasks
        </p>
      </header>
      <Character
      userID = {userID}
      loggedInStatus = {loggedInStatus}
      charactersShown = {charactersShown}
      characterShownSet = {characterShownSet}
      />
    </div>
  );
}





export default App;
