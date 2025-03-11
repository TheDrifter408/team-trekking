import { FC } from "react"

export const ProgressBar:FC<{progress:number}> = ({progress}) => {
    return (
        <div className="flex items-center gap-1">
            <div className="w-full h-2 bg-gray-200 rounded-md">
                <div className="h-full bg-green-500 rounded-md" style={{width: `${progress}%`}}></div>
            </div>
            <p className="ml-2 mt-2">{progress}%</p>
        </div>
    )
}