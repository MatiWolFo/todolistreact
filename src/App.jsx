import { useState } from 'react'
import { CustomForm } from './components/CustomForm'
import { EditForm } from './components/EditForm'
import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { useSessionStorage } from './hooks/useSessionStorage'

function App() {
  const [tasks, setTasks] = useSessionStorage("to-do.tasks", [])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previousFocusEl, setPreviousFocusEl] = useState(null)

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(
      t => (
        t.id !== id
      )))
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(
      t => (
        t.id === id ?
          {
            ...t,
            checked: !t.checked
          } : t
      )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(
      t => (
        t.id === task.id ?
          {
            ...t,
            name: task.name
          } : t
      )))
    closeEditMode()
  }

  const enterEditMode = (task) => {
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
  }

  const closeEditMode = () => {
    setIsEditing(false)
    previousFocusEl.focus()
  }

  return (
    <div className="container">
      <Header />
      <ThemeSwitcher />
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm
        addTask={addTask}
      />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />)}
    </div>
  )
}

export default App
