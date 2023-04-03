import axios from "axios";
import React, { useState } from "react";

const LoginStatus = (props) => {
    const [userOrPass, setUserOrPass] = useState('user');
    const [isHovered, setIsHovered] = useState(false);
    const [newUser, setNewUser] = useState('basic');
    const [newUsername, setNewUserName] = useState(null);
    function mouseOver() {
        setIsHovered(true);
    }
    function mouseOut() {
        setIsHovered(false);
    }
    const backgroundStyle = {
        backgroundColor: isHovered ? '#373c47' : '#282c34'
    }
    const login = (event) => {
        if (event.keyCode === 13) {
            fetch('http://localhost:8000/api/users')
            .then(response => response.json())
            .then(data => {
                if(userOrPass === 'user') {
                    for (let i in data) {
                        if (data[i].username === event.target.value){
                            props.usernameSet(event.target.value);
                            props.userIDSet(data[i].userid)
                            event.target.value = '';
                            setUserOrPass('pass');
                        }
                    }
                }else if(userOrPass === 'pass') {
                    for (let i in data) {
                        if (data[i].username === props.username){
                            if(data[i].password === event.target.value){
                                props.changeLoginButton();
                                setUserOrPass('user');
                            }
                        }
                    }
                }
            })
        }
    }
    const newInformation = (event) => {
        if (event.keyCode === 13) {
            if (newUsername === null) {
                setNewUserName(event.target.value);
                event.target.value = '';
                setUserOrPass('pass');
                props.usernameSet(event.target.value);
            } else {
                setUserOrPass('user');
                const newID = Math.floor(Math.random() * 1000000) + 1
                const data  = {
                    userID: newID,
                    username: newUsername,
                    password: event.target.value
                }
                props.changeLoginButton(1);
                axios.post("http://localhost:8000/api/users/", data)
                .then(response => {
                    console.log("success")
                })
                .catch(error => {
                console.error('Error', error)
            })
            }
            
        }
    }
    function changeButton() {
        setNewUser('button');
    }

    if(props.loggedInStatus === 'loggedOut' && newUser === 'basic'){
        return (
            <div>
                <div
                    id='logIn'
                    onClick={props.changeLoginButton}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle}
                    >
                    LOGIN
                </div>
                <div
                    id='userButton'
                    onClick={changeButton}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle
                    }>
                    New User?
                </div>
            </div>
        )
    }else if (props.loggedInStatus === 'loggedOut' && newUser === 'button'){
        return (
            <div>
                <div
                    id='logIn'
                    onClick={props.changeLoginButton}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle}
                    >
                    LOGIN
                </div>
                <input
                    id='userButton'
                    onKeyDown={newInformation}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle}
                    placeholder={userOrPass === 'user' ? "Username" : "Password"}
                    >
                </input>
            </div>
        )    
    }
    
    else if (props.loggedInStatus === 'loggingIn') {
        if (userOrPass === 'user'){
            return (
                <div>
                <input
                    type="text"
                    id='loggingIn'
                    placeholder='Username'
                    onKeyDown={login}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle}
                    >
                </input>
            </div>
            )
        }else{
            return (
                <div>
                <input
                    type="text"
                    id='loggingIn'
                    placeholder='Password'
                    onKeyDown={login}
                    >
                </input>
            </div>
            )
        }
    }else {
        return (
            <div>
                <div
                    id='loggedIn'
                    >
                    {props.username}
                </div>
            </div>
        )
    }
}

export default LoginStatus;