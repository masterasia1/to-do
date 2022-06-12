import React from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {getTodos, addTodo, updateTodo, deleteTodo} from '../../api/todosApi';

import {useState} from 'react'

function TodoList() {
  
  const [newTodo, setNewTodo] = useState('')
  const queryClient = useQueryClient ()

  const {
      isLoading,
      isError, 
      error,
      data: todos

  } = useQuery('todos', getTodos)
   
  const addTodoMutation = useMutation(addTodo, {
      onSuccess: () => {
          //invalidates cache and refetch
          queryClient.invalidateQueries("todos")
      }
  })
  
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
        queryClient.invalidateQueries("todos")
    }
})
const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
    
        queryClient.invalidateQueries("todos")
    }
})

const handleSubmit = (e) => {
    e.preventDefault()
    addTodoMutation.mutate({userId: 1, title: newTodo, complete: false})
    setNewTodo('')

}


const newItemSection = (
    <form onSubmit={handleSubmit}>
        <label htmlFor='new-todo'>Enter a new todo item</label>
        <div className='new-todo'>
            <input
            type= 'text'
            id='new-todo'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='enter new todo'
            />
        </div>
        <button className='submit'>
        </button>
    </form>
)

let content 
if (isLoading) {
    content = <p>loading</p>
} else if (isError) {
    content = <p>{error.message}</p>
} else {
    content = JSON.stringify(todos)
}


  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList