import { useState } from 'react'
import './App.css'
import DetailPane from './components/DetailPane'
import TaskBoard from './components/TaskBoard'
import { TaskProvider } from './services/useTaskContext'

function App() {

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleSelectTask = (id: number) => {
    setSelectedTaskId(id);
    setIsCreatingTask(false);
  }

  return (
    <TaskProvider>
      <div className='flex flex-row' style={{ height: "100vh" }}>
        <DetailPane
          selectedTaskId={isCreatingTask ? null : selectedTaskId}
          onClose={() => { setSelectedTaskId(null); setIsCreatingTask(false) }}
          isCreatingTask={isCreatingTask}
        />

        <TaskBoard
          onSelectTask={handleSelectTask}
          onCreateTask={() => setIsCreatingTask(true)}
        />
      </div>
    </TaskProvider>
  )
}

// function App() {
//   const [taskInfos, setTaskInfos] = useState<TaskInfo[]>([]);
//   const [selectedTask, setSelectedTask] = useState(-1);
//   const [isCreatingTask, setIsCreatingTask] = useState(false);

//   useEffect(() => {
//     setTaskInfos(mockTaskInfos);
//   }, []);

//   const handleCreateTask = (task: TaskInfo) => {
//     setIsCreatingTask(false);
//     setTaskInfos(prev => [...prev, task]);
//     setSelectedTask(-1);
//   }

//   const handleSetComplete = (index: number) => {
//     const task = taskInfos[index];
//     task.status = 'completed';
//     setTaskInfos(prev => {
//       prev.splice(index, 1);
//       return [task, ...prev]
//     })
//   }

//   const handleDeleteTask = (index: number) => {
//     setTaskInfos(prev => prev.filter((_, i: number) => i !== index));
//   }

//   const handleSelectTask = (index: number) => {
//     setSelectedTask(index);
//     setIsCreatingTask(false);
//   }

//   const handleCreateSelect = () => {
//     setSelectedTask(-1);
//     setIsCreatingTask(true);
//   }

//   return (
//     <div className='flex flex-row' style={{ height: "100vh" }}>
//       <DetailPane
//         taskInfo={selectedTask >= 0 ? taskInfos[selectedTask] : null}
//         onClose={() => { setSelectedTask(-1); setIsCreatingTask(false) }}
//         isCreatingTask={isCreatingTask}
//         onCreateTask={handleCreateTask}
//         onSetComplete={() => { handleSetComplete(selectedTask); setSelectedTask(-1) }}
//         onDeleteTask={() => { handleDeleteTask(selectedTask); setSelectedTask(-1) }}
//       />

//       <TaskBoard
//         taskInfos={taskInfos}
//         onSelectTask={handleSelectTask}
//         onCreateTask={handleCreateSelect}
//       />
//     </div>
//   )
// }

export default App
