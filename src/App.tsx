import { useEffect, useState } from 'react'
import './App.css'
import type { TodoInfo } from './types/types'
import DetailPane from './components/DetailPane'
import TodoBoard from './components/TodoBoard'

const mockTodoInfos: TodoInfo[] = [
  {
    title: "Go shopping",
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel eligendi vero quibusdam deserunt! Placeat, sint fuga maiores velit aperiam aspernatur ab ratione at quia voluptatum quas perspiciatis, nisi nobis aliquam.',
    createdAt: new Date(2025, 10, 10),
    status: 'pending',
    dueAt: new Date(2025, 10, 11)
  },
  {
    title: "Go shopping 2",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis maiores excepturi veritatis odit accusamus, consequuntur dolore autem, tenetur consequatur impedit provident ipsa possimus blanditiis, suscipit at cumque! Ad, quisquam.',
    createdAt: new Date(2025, 9, 20),
    status: 'pending',
    dueAt: new Date(2025, 10, 14)
  },
]

function App() {
  const [todoInfos, setTodoInfos] = useState<TodoInfo[]>([]);
  const [selectedTask, setSelectedTask] = useState(-1);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    setTodoInfos(mockTodoInfos);
  }, []);

  const handleCreateTask = (task: TodoInfo) => {
    setIsCreatingTask(false);
    setTodoInfos(prev => [...prev, task]);
    setSelectedTask(-1);
  }

  const handleSetComplete = (index: number) => {
    const task = todoInfos[index];
    task.status = 'completed';
    setTodoInfos(prev => {
      prev.splice(index, 1);
      return [task, ...prev]
    })
  }

  const handleDeleteTask = (index: number) => {
    setTodoInfos(prev => prev.filter((_, i: number) => i !== index));
  }

  const handleSelectTask = (index: number) => {
    setSelectedTask(index);
    setIsCreatingTask(false);
  }

  const handleCreateSelect = () => {
    setSelectedTask(-1);
    setIsCreatingTask(true);
  }

  return (
    <div className='flex flex-row' style={{ height: "100vh" }}>
      <DetailPane
        todoInfo={selectedTask >= 0 ? todoInfos[selectedTask] : null}
        onClose={() => { setSelectedTask(-1); setIsCreatingTask(false) }}
        isCreatingTask={isCreatingTask}
        onCreateTask={handleCreateTask}
        onSetComplete={() => { handleSetComplete(selectedTask); setSelectedTask(-1) }}
        onDeleteTask={() => { handleDeleteTask(selectedTask); setSelectedTask(-1) }}
      />

      <TodoBoard
        todoInfos={todoInfos}
        onSelectTask={handleSelectTask}
        onCreateTask={handleCreateSelect}
      />
    </div>
  )
}

export default App
