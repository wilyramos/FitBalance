import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function form({dispatch, state}: FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {

    if(state.activeId){
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
    
  }, [state.activeId])



  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity, // Spread operator
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity    
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "save-activity", payload: { newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4(),
      })
  }

  

  
  return (
    <form
      className="bg-white shadow-md rounded px-5 p-10 pb-8 mb-4"
      onSubmit={handleSubmit}

    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className='font-bold'>Categoría: </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}

        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>

          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="name" className='font-bold'>Actividad: </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder='Ej. Correr 30 minutos, Comida, Ensalada, Pesas, Bicicleta, etc.'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="calories" className='font-bold'>Calorías: </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder='Ej. 300 o 500, etc.'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded w-full cursor-pointer mt-4 disabled:opacity-50 "
        value={activity.category===1 ? 'Guardar Comida' : 'Guardar Actividad'}
        disabled={!isValidActivity()}

      />
        
      
    </form>
  )
}
