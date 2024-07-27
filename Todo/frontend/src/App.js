// import { useState,useEffect } from "react";


// import axios from "axios";
// import React from "react";

// function App() {
//   let [enterValue, setenterValue] = useState("");
//   let [fruit, setfruit] = useState([""]);
  
//   useEffect(function(){
//     axios.get("http://localhost:5001/fruitlist").then(function(data){
//     console.log(data.name)
//       setfruit(data.data)
//     })

//   },[])
  



//   function handleChange(eve) {
//     setenterValue(eve.target.value);
//   }
//   function handleADD() {
//    axios.post("http://localhost:5001/addfruit",{newfruit:enterValue})
//     setfruit([...fruit,{name:enterValue}]);

//     setenterValue("");
//   }

//   return (
//     <div className="App">
//       <input value={enterValue} onChange={handleChange}></input>
//       <button onClick={handleADD}>ADD</button>

//       {fruit.map(function (items,index) {
//         return (
//           <h1 key={index}>{items.name}</h1>
//         )
//       })}
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [enterValue, setEnterValue] = useState("");
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/todos")
//       .then((response) => setTodos(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleChange = (e) => {
//     setEnterValue(e.target.value);
//   };

//   const handleAdd = () => {
//     if (enterValue.trim()) {
//       const newTodo = { id: Date.now().toString(), description: enterValue };
//       axios.post("http://localhost:5001/api/todos", newTodo)
//         .then(() => {
//           setTodos([...todos, newTodo]);
//           setEnterValue("");
//         })
//         .catch((error) => console.error("Error adding todo:", error));
//     }
//   };

//   return (
//     <div className="App">
//       <input value={enterValue} onChange={handleChange} />
//       <button onClick={handleAdd}>ADD</button>
//       {todos.map((item, index) => (
//         <h1 key={index}>{item.description}</h1>
//       ))}
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [enterValue, setEnterValue] = useState("");
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/todos")
//       .then((response) => setTodos(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleChange = (e) => {
//     setEnterValue(e.target.value);
//   };

//   const handleAdd = () => {
//     if (enterValue.trim()) {
//       const newTodo = { id: Date.now().toString(), description: enterValue };
//       axios.post("http://localhost:5001/api/todos", newTodo)
//         .then(() => {
//           setTodos([...todos, newTodo]);
//           setEnterValue("");
//         })
//         .catch((error) => console.error("Error adding todo:", error));
//     }
//   };

//   const handleUpdate = (id, newDescription) => {
//     axios.put(`http://localhost:5001/api/todos/${id}`, { description: newDescription })
//       .then((response) => {
//         setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
//       })
//       .catch((error) => console.error("Error updating todo:", error));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5001/api/todos/${id}`)
//       .then(() => {
//         setTodos(todos.filter(todo => todo.id !== id));
//       })
//       .catch((error) => console.error("Error deleting todo:", error));
//   };

//   return (
//     <div className="App">
//       <input value={enterValue} onChange={handleChange} />
//       <button onClick={handleAdd}>ADD</button>
//       {todos.map((item, index) => (
//         <div key={index}>
//           <input
//             value={item.description}
//             onChange={(e) => handleUpdate(item.id, e.target.value)}
//           />
//           <button onClick={() => handleDelete(item.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // For adding styles

function App() {
  const [enterValue, setEnterValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setEnterValue(e.target.value);
  };

  const handleAdd = () => {
    if (enterValue.trim()) {
      const newTodo = { id: Date.now().toString(), description: enterValue };
      axios.post("http://localhost:5001/api/todos", newTodo)
        .then(() => {
          setTodos([...todos, newTodo]);
          setEnterValue("");
        })
        .catch((error) => console.error("Error adding todo:", error));
    }
  };

  const handleEdit = (id, description) => {
    setEditMode(id);
    setEditValue(description);
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5001/api/todos/${id}`, { description: editValue })
      .then((response) => {
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        setEditMode(null);
        setEditValue("");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          className="input"
          value={enterValue}
          onChange={handleChange}
          placeholder="Add a new todo"
        />
        <button className="add-button" onClick={handleAdd}>ADD</button>
      </div>
      <div className="todo-list">
        {todos.map((item) => (
          <div key={item.id} className="todo-item">
            {editMode === item.id ? (
              <>
                <input
                  className="todo-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="save-button" onClick={() => handleUpdate(item.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.description}</span>
                <button className="edit-button" onClick={() => handleEdit(item.id, item.description)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
