import React, { useState } from "react";
import axios from 'axios';
import Trashcan from './Trashcan.jsx';

const Character = (props) => {
    const [toRender, setToRender] = useState([]);
    const [characterInput, setCharacterInput] = useState([]);
    const [text, setText] = useState("Show Characters");
    const [textBox, setTextBox] = useState('false');
    const [isHovered, setIsHovered] = useState(false);
    function mouseOver() {
        setIsHovered(true);
    }
    function mouseOut() {
        setIsHovered(false);
    }
    const backgroundStyle = {
        backgroundColor: isHovered ? '#373c47' : '#282c34'
    }
    function onChangeMark (event, charid, type) {
        if(event.target.checked) {
            if (type === 'mythic') {
                    const data  = {
                        mythic: 1
                    }
                    axios.patch('http://localhost:8000/api/character/' + charid, data)
                    .then(response => {
                        console.log("success")
                    })
                    .catch(error => {
                    console.error('Error', error)
                })  
            }else {
                const data  = {
                    raid: 1
                }
                axios.patch('http://localhost:8000/api/character/' + charid, data)
                .then(response => {
                    console.log("success")
                })
                .catch(error => {
                console.error('Error', error)
            })
            }
        }else{
            if (type === 'mythic') {
                const data  = {
                    mythic: -1
                }
                axios.patch('http://localhost:8000/api/character/' + charid, data)
                .then(response => {
                    console.log("success")
                })
                .catch(error => {
                console.error('Error', error)
            })  
        }else {
            const data  = {
                raid: -1
            }
            axios.patch('http://localhost:8000/api/character/' + charid, data)
            .then(response => {
                console.log("success")
            })
            .catch(error => {
            console.error('Error', error)
        })
        }
            
        }
    }
 
    function reallyDelete(id){
        axios.delete('http://localhost:8000/api/character/' + id)
        .then(response => {
            console.log('success')
        }).catch(error => {
            console.error(error);
        })
        setText("Show Characters")
    }
    
    function getCharacters() {
        if(props.loggedInStatus === "loggedIn") {
            let id = props.userID;
            fetch('http://localhost:8000/api/users/character/' + id)
            .then(response => response.json())
            .then(data => {
                const charList = data.map((chars, index) => {
                    const checkArray = [1,2,3,4,5,6,7,8]
                    const numCheckedMythic = chars.mythic;
                    const checkmarks = [checkArray.map((num, i) => (
                        <input class='mythicbox'type="checkbox" key={i} defaultChecked={i <numCheckedMythic} onChange={event => onChangeMark(event, chars.charid, 'mythic')}/>
                        )
                    )]
                    const numCheckedRaid = chars.raid;
                    const checkmarksRaid = [checkArray.map((num, i) => (
                        <input class='raidbox'type="checkbox" key={i} defaultChecked={i <numCheckedRaid} onChange={event => onChangeMark(event, chars.charid, 'raid')}/>
                        )
                    )]
                    return (
                        <div id={chars.charid} class='characterBox' key={index}>
                            <h2 
                            class='charname' 
                            >
                                {chars.charname} 
  
                            </h2>
                            <span onClick={event => reallyDelete(chars.charid)}  class="buttonBorder" height={10} style={{ backgroundColor: 'antiquewhite'} }>
                                <Trashcan class="trashcan" width={16} height={16} color="#282c34" />
                            </span>
                            <div class='charText'>
                                Mythic+
                            </div>
                                <div class="checkboxContainer">
                                    {checkmarks}    
                                </div>
                                <div class='charText'>
                                Raid
                                </div>
                                <div class="checkboxContainer">
                                    {checkmarksRaid}
                                </div>
                        </div>
                    )
                }
                )
                setText('Add Character')
                setToRender(charList);
            })  
        }
    }
    function addCharactersInput() {
        setTextBox(true);
        let rendered = (
            <input
            type='text'
            id='charInput'
            placeholder='Character Name'
            onKeyDown={add}
            onKeyUp={getCharacters}
            >

            </input>
        )
        setCharacterInput(rendered);
    }
    const add = (event) => {
        if (event.keyCode === 13) {
            let id = props.userID;
            let data = {
                charname: event.target.value
            }
            axios.post('http://localhost:8000/api/character/' + id, data)
            .then(response => {
                console.log('success')
            })
            .catch(error => {
                console.error(error)
            })
            event.target.value = '';
            setTextBox(false);
            setText("Show Characters");
        }
    }
    if(props.loggedInStatus === 'loggedIn'){
        return (
            <div id='charBlock'>
                <div 
                id="generate"
                onClick={text==="Show Characters" ? getCharacters : addCharactersInput}
                onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                    style={backgroundStyle}
                >
                {text}
                {text === "Add Character" && textBox === true? characterInput : null}
                </div>
                <div class="characterSpread">
                {toRender}
                </div>
            </div>
            
         )
    }
}
export default Character;