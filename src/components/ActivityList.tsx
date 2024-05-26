import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}



export default function ActivityList({activities, dispatch}: ActivityListProps) {

    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.map( cat => Number(cat.id) === category ? cat.name : '' )
    , [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])


  return (
        <>
            {isEmptyActivities && (
                <p className="text-center my-5 text-1xl">No hay actividades</p>
            )}
            {activities.map((activity) => (
                <div key={activity.id} className="px-5  bg-white mt-3  justify-between shadow-md">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-2 right-0 px-6 py-1 text-white uppercase font-bold 
                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categoryName(activity.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5 ">{activity.name}</p>
                        <p className="font-bold text-3xl text-lime-500">   
                        {activity.calories}{' '}<span>Calorias</span>
                        </p>

                        <div className="absolute right-0 bottom-0 items-center">
                            <button
                                onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
                            >
                                <PencilSquareIcon 
                                    className="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" 
                                />
                            </button>

                            <button
                                onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
                            >
                                <XCircleIcon 
                                    className="h-6 w-6 text-red-500 hover:text-red-800 cursor-pointer" 
                                />
                            </button>                        
                        </div>
                    </div>                    
                </div>
            ))}            
        </>
    )
}
