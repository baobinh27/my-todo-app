import { RiCloseCircleFill } from "react-icons/ri";
import type { TodoInfo } from "../types/types";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { calculateDifferenceOfDays } from "../utils/utils";

type DetailPaneProps = {
    todoInfo: TodoInfo | null,
    onClose: () => void,
    isCreatingTask: boolean,
    onCreateTask: (task: TodoInfo) => void,
    onSetComplete: () => void,
    onDeleteTask: () => void
}

const DetailPane = ({ todoInfo, onClose, isCreatingTask, onCreateTask, onSetComplete, onDeleteTask }: DetailPaneProps) => {
    const [tempInfo, setTempInfo] = useState<TodoInfo>({ title: "", description: "", createdAt: new Date(), status: 'pending', dueAt: new Date() });
    const [showEditMode, setShowEditMode] = useState(false);

    useEffect(() => {
        if (todoInfo) { setTempInfo(todoInfo); setShowEditMode(false) }
        else setTempInfo({ title: "", description: "", createdAt: new Date(), status: 'pending', dueAt: new Date() });
    }, [todoInfo])

    useEffect(() => {
        setShowEditMode(isCreatingTask);
    }, [isCreatingTask])

    const handleChangeTitle = (t: string) => {
        setTempInfo({
            ...tempInfo,
            title: t,
        })
    }

    const handleChangeDescription = (t: string) => {
        setTempInfo({
            ...tempInfo,
            description: t,
        })
    }

    const handleChangeDuration = (days: number) => {
        const day = 24 * 60 * 60 * 1000;
        setTempInfo({
            ...tempInfo,
            dueAt: new Date(Date.now() + days * day),
        })
    }

    return <div className="bg-[#333338] w-1/4 h-100vh p-4">
        <h1 className="text-xl font-semibold mb-4">My Todo List</h1>
        {!showEditMode && todoInfo && <div className="flex flex-col gap-4 justify-center bg-[#474751] rounded-lg p-2">

            <div className="relative w-full flex justify-center items-center">
                <button
                    className="absolute right-0 top-0"
                    onClick={onClose}
                >
                    <RiCloseCircleFill size={20} />
                </button>

                <p className="text-md font-semibold">{todoInfo.title}</p>
            </div>

            <p className="text-left text-sm">{todoInfo.description}</p>

            <p className="text-right text-sm">{`Due at ${todoInfo.dueAt.toLocaleDateString()}`}</p>

            {todoInfo.status !== 'completed' && <>
                <button
                    className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                    onClick={onSetComplete}
                >
                    <FaCheckCircle />
                    Mark as completed
                </button>
                <button
                    className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                    onClick={() => setShowEditMode(true)}
                >
                    <FaEdit />
                    Edit task
                </button></>}

            <button
                className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D] text-red-300"
                onClick={() => { onDeleteTask() }}
            >
                <FaTrash />
                Delete task
            </button>

        </div>}
        {showEditMode && <div className="flex flex-col gap-4 justify-center bg-[#474751] rounded-lg p-2">
            <div className="relative w-full flex justify-center items-center">
                <button
                    className="absolute right-0 top-0"
                    onClick={() => { onClose(), setShowEditMode(false) }}
                >
                    <RiCloseCircleFill size={20} />
                </button>

                <p className="text-md font-semibold">New Task</p>
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Task name</label>
                <input
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Task name"
                    onChange={(e: any) => handleChangeTitle(e.target.value)}
                    value={tempInfo.title}
                />
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Description</label>
                <textarea
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Description"
                    rows={3}
                    onChange={(e: any) => handleChangeDescription(e.target.value)}
                    value={tempInfo.description}
                />
            </div>

            <div className="w-full flex flex-col items-start">
                <label>Task duration</label>
                <input
                    className="w-full border-2 p-2 rounded-md border-[#777777] bg-[#333338] focus:outline-0"
                    placeholder="Duration (in days)"
                    type="number"
                    onChange={(e: any) => handleChangeDuration(e.target.value)}
                    value={calculateDifferenceOfDays(tempInfo.dueAt.valueOf(), Date.now())}
                />
            </div>

            <button
                className="flex flex-row gap-2 items-center justify-center text-md font-medium border-[#777777] border-2 rounded-md py-2 hover:bg-[#52525D]"
                onClick={() => {
                    onCreateTask(tempInfo);
                    setShowEditMode(false);
                    if (!isCreatingTask) onDeleteTask();
                }}
            >
                <FaCheckCircle />
                Done
            </button>
        </div>}

        {!todoInfo && !showEditMode && <div>
            <p>Choose a task to see more details.</p>
        </div>}

    </div>
}



export default DetailPane;  