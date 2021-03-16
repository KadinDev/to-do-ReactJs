import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean; // true ou false
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if(!newTaskTitle) return alert("Espaço vazio não é permitido!")

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    // task está como Array
    // spread operator - ... ele pega os valores que já tem
    // vou pegar os valores dentro e passar para o array [...oldState
    // e adiciona no newTask
    setTasks(oldState => [...oldState, newTask ] )
    setNewTaskTitle('')
    

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    // mapear as tasks
    const ckeckTask = tasks.map(task => task.id === id ? {
      ...task, // pegar todos os valores antigos da task
      isComplete: !task.isComplete
    } : task)

    setTasks(ckeckTask)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // retorna as task onde o id for direfente do id passado acima
    const filterTasks = tasks.filter(task => task.id !== id )

    setTasks(filterTasks)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)} // o que digitar vai estar passando para o setNewTaskTitle
            value={newTaskTitle} // valor dele
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}