import { useState ,useCallback, useEffect,useRef} from 'react'
import React from 'react';



function App() {
  const [lenth, setlenth] = useState(8)
  const [numberallow, setnumberallow] = useState(false)
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("")

  const passwordref = useRef(null)

  const passwordGenerater = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallow)  str += "0123456789"
    if(charallow) str += "!@#$%^&*(){}[]=+~'"

    for (let i=1; i <=lenth; i++) {
      let char = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)
      
    }


    setpassword(pass)
    // console.log(pass);
  },[lenth,numberallow,charallow,setpassword]) 

  const copytheinputpass =useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  passwordGenerater()
},[lenth,numberallow,charallow,passwordGenerater])








  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
    text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generater</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        Value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly 
        ref ={passwordref} />
        <button onClick = {copytheinputpass}className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input
          type='range'
          min = {6}
          max = {100}
          value = {lenth}
          className='cursor-pointer'
          onChange={(e) => {setlenth(e.target.value)}}/>
          <label>Lenth:{lenth}</label>
        </div>


        <div className='flex item-center gap-x-1'>
         <input
         type="checkbox"
         defaultChecked={numberallow}
         id='numberinput'
         onChange={()=>{
          setnumberallow((prev) =>!prev);
         }}/>
        </div>
        <label htmlFor='numberinput'>Number</label>

        <div className='flex item-center gap-x-1'>
         <input
         type="checkbox"
         defaultChecked={charallow}
         id='charinput'
         onChange={()=>{
          setcharallow((prev) =>!prev);
         }}/>
        </div>
        <label htmlFor='charinput'>Characters</label>

      </div>
       
    </div>
   </>
  )
}

export default App
