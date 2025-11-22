import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";
import type { TaskInfo } from "../types/types";
import { calculateDifferenceOfDays } from "../utils/utils";

type CardProps = {
    id: number,
    taskInfo: TaskInfo,
    onSelect: () => void
}

const Card = ({ id, taskInfo, onSelect }: CardProps) => {
    return <div
        id={id.toString()}
        onClick={onSelect}
        className="flex flex-col items-center justify-between w-5/6 bg-[#333338] p-4 rounded-md hover:bg-[#3A3A42] hover:cursor-pointer duration-200"
        style={{ aspectRatio: "1 / 1" }}
    >
        <div className="flex flex-col items-center">
            <FaCircle size={20}/>
            <h1 className="font-medium text-lg mt-5 truncate w-full">{taskInfo.title}</h1>
            <p className="w-full line-clamp-4 text-xs text-left my-2">{taskInfo.description}</p>
        </div>
        {taskInfo.status === 'pending' && <div className="flex flex-row w-full gap-2 justify-end items-center">
            <FaClock size={12}/>
            <p className="text-xs">{(() => {
                const days = calculateDifferenceOfDays(taskInfo.dueAt.valueOf(), Date.now())
                if (days === 0) return "Due in less than a day";
                else if (days > 0) return `Due in ${days} days`;
                else return "Overdued"
            })() }</p>
        </div>}

        {taskInfo.status === 'completed' && <div className="flex flex-row w-full gap-2 justify-end items-center">
            <FaCheckCircle size={12} fill="green"/>
            <p className="text-xs text-green-500">Completed</p>
        </div>}

    </div>
}

export default Card;