import React from 'react'
import '../Styles/PassGen.css'
import { useState, useCallback, useEffect, useRef } from 'react' 

const PassGen = () => {

    const [password, setPassword] = useState("");
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [character, setCharacter] = useState(false);

    const generatePassword = useCallback(() => {

        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (number) {
            str += "0123456789";
        }
        if (character) {
            str += "`~!@#$%^&*()-_=+[]{}|;:?.>,<";
        }

        for(let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);

    }, [length, number, character]);

    useEffect(() => {

        generatePassword();
    }, [number, character, length]);

    let reference = useRef(null);

    const copyTextForClipBoard = () => {
        reference.current?.select();
        window.navigator.clipboard.writeText(password);
    }

  return (
    <>
        <div className='passBox'>
            <div className='passGenText'>
                <h2 className='text'>Password Generator</h2>
            </div>
            <div className='passShow'>
                <input className='textBox' type="text" value={password} ref={reference}/>
                <button className='btn' onClick={copyTextForClipBoard}>Copy</button>
            </div>
            <div className='passControls'>
                <input className='rangeLength' type="range" min={8} max={20} value={length} 
                onChange={(e) => {setLength(e.target.value)}} />

                <p className='showLength'>Length {length}</p>

                <input className='tickBox' type="checkbox" defaultChecked={number}
                onChange={() => {
                    setNumber(pre => !pre);    
                }} /><p className='checkBox'>Number</p>

                <input className='tickBox' type="checkbox" defaultChecked={character}
                onChange={() => {
                    setCharacter(pre => !pre);
                }} /><p className='checkBox'>Character</p>

            </div>
        </div>
    </>
  )
}

export default PassGen