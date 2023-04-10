const express=require("express");
const cors=require("cors");
const app=express();

const mongoose=require("mongoose");


app.use(cors());
app.listen(8000,()=>{
    console.log("listening at port 8000");
});
app.use(express.json());


// mongodb connectons
const url="mongodb://127.0.0.1:27017/TodoList"
//const url="mongodb+srv://siddakrajpal14:TmAZM9aqiQrCk8nC@cluster0.ag1oir9.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
    console.log("connected");
});
const todoschema=mongoose.Schema({
    todo:String,
    done:{
        type:Boolean,
        default :false
    }
});
const todomodel=mongoose.model("Todo",todoschema);



// Routing handeling request from frontend
app.post("/todos",async(req,res)=>{
   try{  
    const todonew=new todomodel({todo:req.body.data});
    todonew.save();
    res.json(todonew);
}catch(err){
    console.log(err);
}
});
app.get("/todos",async(req,res)=>{
    const todolist= await todomodel.find({});
    res.json(todolist);
});

app.post("/todos/:id",async(req,res)=>{
     await todomodel.findByIdAndUpdate({_id:req.params.id},{todo:req.body.data});
     res.send("updated");
});

app.delete("/todos/:id",async(req,res)=>{
    await todomodel.findByIdAndDelete({_id:req.params.id});
    res.send("deleted succesfully");
});