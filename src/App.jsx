import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  // Using statefull variable - Will be modified
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos:newList}))
  }

  function handleAddTodos(newTodo) {
    // ... spreads out the todos array into individual elements
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  } 

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    }) 

    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodo(index)
  }

  // To retrieve data from JSON if it exists
  useEffect(() => {
    if (!localStorage) {
      return
    }

    // Search for local todos and check if it exists
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }
    
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, []) 

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </>
  )
}

export default App