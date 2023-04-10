import React from 'react'
import { useState } from 'react'
import { addTodo } from '../Api';
const Todoform = () => {
    const [text,settext]=useState("");
    const formsubmit=(e)=>{
        e.preventDefault();
        addTodo(text);
        window.location.reload();
    }
  return (
    <div>
        <form onSubmit={formsubmit}>
            <input type="text"value={text} onChange={(e)=> settext(e.target.value)}/>
            
            
        </form>
    </div>
  )
}

export default Todoform