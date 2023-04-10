import axios from "axios";
const url="http://localhost:8000/todos";
export const addTodo = async(data) =>{
     await axios.post(url,{data});
}

export const getallTodo=async()=>{
 const res= await axios.get(url);
 console.log(res);
 return res.data
}

export const edittodo =async(data,id)=>{
await axios.post(url+"/"+id,{data});
}

export const deletetodo=async(id)=>{
    await axios.delete(url+"/"+id);
}