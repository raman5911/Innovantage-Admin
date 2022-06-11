import { React, useEffect, useState } from 'react';
import './App.css';
import './Layout';
import Layout from './Layout';
import Login from './Login';

import {get} from "../utils";

function App() {

  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    profile_picture: ""
  });

  // useEffect(() => {
  //   get(`${process.env.REACT_APP_API_URL}/auth/admin`, {}).then((response) => {
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }, []);

  return (
    <div className="App">
      { login === true ? <Layout setLogin={setLogin} userData={userData} /> : <Login setLogin={setLogin}  userData={userData} setUserData={setUserData} /> }      
    </div>
  );
}

export default App;