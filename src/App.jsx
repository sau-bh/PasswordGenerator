import { useCallback, useEffect, useRef, useState } from "react"



function App() {
  const [length , setLength] = useState(8);
  const [numberallowed , setNumberallowed] = useState(false)
  const [characterallowed , setCharacterallowed] = useState(false)
  const [password , setPassword] =useState("")

  const passwordref = useRef(null)

  const passwordgenerator =useCallback(()=>{
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberallowed) str += "0123456789";
    if(characterallowed) str += "~!@#$%^&*(){}?><:;" 

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);

    }
    setPassword(pass)

  }

    
    
    , [length , numberallowed , characterallowed ,setPassword])

    useEffect(()=>{
      passwordgenerator()
    },[length , numberallowed , characterallowed , passwordgenerator])

    const copyPasswordtoClipBoard =useCallback(()=>{
      passwordref.current?.select()
      passwordref.current?.setSelectionRange(0,100)
      window.navigator.clipboard.writeText(password)
    },[password])

  
  return (
   
    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">

    <h1 className="text-white text-center"> Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text" 
    value={password}
     className="outline-none w-full py-1 px-3" 
     placeholder="password"
     readOnly
     ref={passwordref}
/>


<button
onClick={copyPasswordtoClipBoard}
className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "

>Copy</button>
</div>
<div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
    <input type="range"
    min={6} 
    max={100}
    className="cursor-pointer"
    onChange={(e)=>{
              setLength(e.target.value)
    }}
    />
    <label > length:{length}</label>
  </div>

  <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={numberallowed}
    id="numberInput"
    onChange={()=>{
      setNumberallowed((prev)=>!prev)
    }}
     
     
     />
     <label htmlFor="numberInput">Numbers</label>
  </div>

  <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={characterallowed}
    id="characterInput"
    onChange={()=>{
      setCharacterallowed((prev)=>!prev)
    }}
     
     
     />
     <label htmlFor="characterInput">Characters</label>
  </div>

</div>


   </div>

      </>
  )
}

export default App
