import { useMemo } from 'react'
import type { Activity } from '../types'


type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities } : CalorieTrackerProps) {
  
    // Contadores

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [activities])
    
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [activities])

    const caloriesNet = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])
  
    return (
        <>
            <div className='flex flex-col items-center md:justify-between gap-5 mt-10 '>
                <p className='rounded-full tex-3xl grid grid-cols-1 gap-2 text-center'>
                    <span className='font-black text-5xl text-lime-500'>{caloriesConsumed}</span>
                    Consumidas
                </p>
                <p className='rounded-full tex-3xl grid grid-cols-1 gap-2 text-center'>
                    <span className='font-black text-5xl text-orange-500'>{caloriesBurned}</span>
                    Quemadas
                </p>

                <p className='rounded-full tex-3xl grid grid-cols-1 gap-2 text-center'>
                    <span className='font-black text-5xl text-white'>{caloriesNet}</span>
                    Netas
                </p>                        
            </div>       
                    
        </>
  )
}
