import { useState, useEffect } from "react";
import { getallTodo ,edittodo,deletetodo} from "../Api";


const Showtodo = () => {
  const [todolist, setTodolist] = useState([]);
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  useEffect(() => {
    getallTodo()
      .then((data) => {
        setTodolist(data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  const handleDelete = (id) => {
           deletetodo(id);
           window.location.reload();
  };

  const handleEdit = (index) => {
    const todo = todolist[index];
    setEditTodoIndex(index);
    setEditTodoText(todo.todo);
  };

  const handleEditChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleEditSubmit = (event,id) => {
    event.preventDefault();
    setEditTodoIndex(null);
   edittodo(editTodoText,id);
    setEditTodoText("");
    window.location.reload();

  };

  return (
    <div>
      <ul>
        {todolist.map((todo, index) => (
          <li key={todo.id}>
            {editTodoIndex === index ? (
              <form onSubmit={(evetn)=>handleEditSubmit(evetn,todo._id)}>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={handleEditChange}
                />
               
              </form>
            ) : (
              <>
                {todo.todo}
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Showtodo;
