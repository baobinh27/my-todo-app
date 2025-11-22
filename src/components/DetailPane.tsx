import { RiCloseCircleFill } from "react-icons/ri";
import type { TaskInfo } from "../types/types";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { calculateDifferenceOfDays } from "../utils/utils";
import LoadingScreen from "./LoadingScreen";
import { useTaskContext } from "../services/useTaskContext";

type DetailPaneProps = {
    selectedTaskId: number | null,
    onClose: () => void,
    isCreatingTask: boolean,
}

const DetailPane = ({ selectedTaskId, onClose, isCreatingTask }: DetailPaneProps) => {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<TaskInfo | null>(null);
    const [taskDurationInDays, setTaskDurationInDays] = useState(1);
    const [editMode, setEditMode] = useState(false);

    const { getTaskById, createTask, updateTask, deleteTask, markCompleted } = useTaskContext();

    useEffect(() => {
        setEditMode(false);
        setLoading(true);
        if (selectedTaskId && !isCreatingTask) {
            const findTask = getTaskById(selectedTaskId);
            setTask(findTask ? findTask : null);
        }
        if (isCreatingTask) {
            setTask({ id: 0, title: "", description: "", createdAt: new Date(), status: 'pending', dueAt: new Date() })
        }
        setLoading(false);
    }, [selectedTaskId, isCreatingTask])

    const handleChangeTitle = (t: string) => {
        if (!task) return;
        setTask({
            ...task,
            title: t,
        })
    }

    const handleChangeDescription = (t: string) => {
        if (!task) return;
        const updated: TaskInfo = { ...task, description: t }
        setTask(updated)
    }

    const handleChangeDuration = (days: number) => {
        if (!task) return;
        setTaskDurationInDays(days)
        const day = 24 * 60 * 60 * 1000;
        setTask({
            ...task,
            dueAt: new Date(Date.now() + days * day),
        })
    }

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleSetComplete = () => {
        if (task) markCompleted(task.id);
    }

    const handleDelete = () => {
        if (task) deleteTask(task.id);
    }

    if (loading) {
        return <LoadingScreen />
    }

    return <div className="bg-[#333338] w-1/4 h-100vh p-4">
        <h1 className="text-xl font-semibold mb-4">My Todo List</h1>
        {!(isCreatingTask || editMode) && task && <div className="flex flex-col gap-4 justify-center bg-[#474751] rounded-lg p-2">

            <div className="relative w-full flex justify-center items-center">
                <button
                    className="absolute right-0 top-0"
                    onClick={() => { onClose(); setTask(null) }}
                >
                    <RiCloseCircleFill size={20} />
                </button>

                <p className="text-md font-semibold">{task.title}</p>
            </div>

            <p className="text-left text-sm">{task.description}</p>

            <p className="text-right text-sm">Due at <span className="font-bold">{(new Date(task.dueAt)).toDateString()}</span></p>

            {task.status !== 'completed' && <>
                <button
                    className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                    onClick={handleSetComplete}
                >
                    <FaCheckCircle />
                    Mark as completed
                </button>
                <button
                    className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                    onClick={handleEditClick}
                >
                    <FaEdit />
                    Edit task
                </button></>}

            <button
                className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D] text-red-300"
                onClick={handleDelete}
            >
                <FaTrash />
                Delete task
            </button>

        </div>}
        {(isCreatingTask || editMode) && task && <div className="flex flex-col gap-4 justify-center bg-[#474751] rounded-lg p-2">
            <div className="relative w-full flex justify-center items-center">
                <button
                    className="absolute right-0 top-0"
                    onClick={() => { onClose(); setTask(null) }}
                >
                    <RiCloseCircleFill size={20} />
                </button>

                <p className="text-md font-semibold">{isCreatingTask ? "New Task" : "Edit Task"}</p>
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Task name</label>
                <input
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Task name"
                    onChange={(e: any) => handleChangeTitle(e.target.value)}
                    value={task.title}
                />
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Description</label>
                <textarea
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Description"
                    rows={3}
                    onChange={(e: any) => handleChangeDescription(e.target.value)}
                    value={task.description}
                />
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Task duration (days)</label>
                <input
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Duration (in days)"
                    type="number"
                    defaultValue={calculateDifferenceOfDays(task.dueAt.valueOf(), Date.now())}
                    onChange={(e: any) => handleChangeDuration(e.target.value)}
                    value={taskDurationInDays}
                />
            </div>

            <button
                className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                onClick={() => {
                    if (isCreatingTask) createTask(task)
                    if (editMode) updateTask(task)
                    onClose()
                    setEditMode(false)
                }}
            >
                <FaCheckCircle />
                Done
            </button>
        </div>}

        {!task && !isCreatingTask && <div>
            <p>Choose a task to see more details.</p>
        </div>}

    </div>
}



export default DetailPane;  