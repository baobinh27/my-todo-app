import { BiLoader } from "react-icons/bi"


const LoadingScreen = () => {
    return <div className='w-full h-full flex items-center justify-center'>
        <BiLoader size={32} fill='white' />
    </div>
}

export default LoadingScreen;