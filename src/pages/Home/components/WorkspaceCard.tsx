import { User, Workspace } from "@/types/ApiResponse";
import { FC } from "react";
import { Link } from "react-router-dom";

export const WorkspaceCard:FC<Pick<Workspace, "id" | "name" | "description" | "members">> = ({ id, name, description, members }) => { 
    return (
        <div className="w-full cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
                {/* Workspace Icon/Initials */}
                <div 
                className="rounded-full flex items-center justify-center mr-4 bg-indigo-600 text-white font-bold"
                style={{ width: '50px', height: '50px' }}>
                    {name.split(' ').map((n) => n[0]).join('')} 
                </div>
                <div>
                <h5 className="font-medium mb-1 hover:underline dark:text-black"><Link to={`/workspace/${id}`}>{name}</Link></h5>
                <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>

            {/* Members Avatars */}
            <div className="flex">
                {
                    members.length > 0 ? members.map((member:User, index) => (
                        <div key={index} className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                            style={{ width: '25px', height: '25px', fontSize: '10px', marginLeft: index > 0 ? '-10px' : '0' }}>
                            {member.email.split(' ').map((n) => n[0].toLocaleUpperCase()).join('')}
                        </div>
                    )) : <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                    style={{ width: '25px', height: '25px', fontSize: '10px', marginLeft: '0' }}>
                    No Members Added
                    </div>
                }
            </div>
            </div>
        </div>
    )
}