// const express=require("express")
// const  cors=require("cors")
// const mongoose=require("mongoose")


// const app =express()
// app.use(cors())
// app.use(express.json())
// // const url = "mongodb+srv://arunpravin12345:okmijnuhb@cluster0.vbaicva.mongodb.net/todo1?retryWrites=true&w=majority&appName=Cluster0"
// // const fruit =[""]
// mongoose.connect("mongodb+srv://arunpravinVaratharajan:okmijnuhb@cluster01.9rk3kml.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster01").then(function(){
//     console.log("DB connect succsess")
// }).catch(()=>console.log("DM Failed"))
// // client.connect().then(()=>console.log("DB connect success")).catch(()=>console.log("Db connect failed"))

// const Fruit =mongoose.model("Fruit",{name:String},"todoappcollection")
         
// app.get("/fruitlist",function(req,res){

//     Fruit.find().then(function(retrievedata){
//         console.log(retrievedata.name)
//         res.send(retrievedata)
//     })
//     // res.send(fruit)
// })

// app.post("/addfruit",function(req,res){
//     var newfruit=req.body.newfruit
    
//     const newFruit = new Fruit(
//         {
//             name:newfruit
//         }
//     );
//     newFruit.save().then(()=>console.log("Savesuccess"))
   
// })


// app.listen(5001,function(){
//     console.log("Server Started...... :)")
   
// })


// const uri = "mongodb+srv://arunpravin12345:<password>@cluster01.9rk3kml.mongodb.net/?retryWrites=true&w=majority";dfdf
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const mongoURI = "mongodb+srv://arunpravinVaratharajan:okmijnuhb@cluster01.9rk3kml.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster01";

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("DB connect success"))
// .catch((error) => console.log("DB connect failed:", error));

// const todoSchema = new mongoose.Schema({
//   id: String,
//   description: String,
// });

// const Todo = mongoose.model("Todo", todoSchema, "todoappcollection");

// app.get("/api/todos", (req, res) => {
//   Todo.find()
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send({ error: "Failed to fetch data" }));
// });

// app.post("/api/todos", (req, res) => {
//   const { id, description } = req.body;
//   const newTodo = new Todo({
//     id,
//     description,
//   });
//   newTodo.save()
//     .then(() => res.send({ message: "Save success" }))
//     .catch((err) => res.status(500).send({ error: "Failed to save data" }));
// });

// app.listen(5001, () => {
//   console.log("Server started on port 5001");
// });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://arunpravinVaratharajan:okmijnuhb@cluster01.9rk3kml.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster01";
;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB connect success"))
.catch((error) => console.log("DB connect failed:", error));

const todoSchema = new mongoose.Schema({
  id: String,
  description: String,
});

const Todo = mongoose.model("Todo", todoSchema, "todoappcollection");

// Read all todos
app.get("/api/todos", (req, res) => {
  Todo.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ error: "Failed to fetch data" }));
});

// Create a new todo
app.post("/api/todos", (req, res) => {
  const { id, description } = req.body;
  const newTodo = new Todo({
    id,
    description,
  });
  newTodo.save()
    .then(() => res.send({ message: "Save success" }))
    .catch((err) => res.status(500).send({ error: "Failed to save data" }));
});

// Update an existing todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  Todo.findOneAndUpdate({ id }, { description }, { new: true })
    .then((updatedTodo) => res.send(updatedTodo))
    .catch((err) => res.status(500).send({ error: "Failed to update data" }));
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findOneAndDelete({ id })
    .then(() => res.send({ message: "Delete success" }))
    .catch((err) => res.status(500).send({ error: "Failed to delete data" }));
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
