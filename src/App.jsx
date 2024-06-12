import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAlowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const copyPassowrd = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(4,13)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&()_?/~"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 '>
        <h2 className='text-center text-2xl text-white py-3'> Password Generator</h2>
        <div className='flex flex-col sm:flex-row rounded-lg overflow-hideen mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-t-lg sm:rounded-l-lg rounded-t-none'
            placeholder="Password"
            readOnly
            ref={passwordRef}
          ></input>
          <button className='text-white bg-blue-700 px-3 py-0.5 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none outline-none hover:opacity-60'
            onClick={copyPassowrd}
          >Copy</button>
        </div>
        <div className='flex flex-col sm:flex-row text-sm gap-x-2 sm:gap-y-0'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            ></input>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              value={length}
              className='cursor-pointer'
              onChange={() => { setNumberAlowed(prev => !prev) }}
            ></input>
            <label>Numbers.</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              value={length}
              className='cursor-pointer'
              onChange={() => { setCharAllowed(prev => !prev) }}
            ></input>
            <label>Characters.</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
