import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import {activityReducer, initialState} from './reducers/activity-reducer'
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";


function App() {

    const [state, dispatch ] = useReducer(activityReducer, initialState)

    // para que no reinicie cuando no hay nada

    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

    // PARA EL LOCALSTORAGE

    useEffect(() => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    return (
      <>
        <header className="bg-lime-600 py-3">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center px-5">
            <h1 className="text-center text-2xl text-white font-bold">FitBalance</h1>
            <button
              className="bg-gray-600 text-white py-2 px-2 rounded disabled:opacity-80"
              disabled={!canRestartApp()}
              onClick={() => dispatch({type: 'restart-app'})}
            >
              Reiniciar App
            </button>
          </div>
        </div>
        </header>

        <section className="container mx-auto mt-10">
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2 px-5">

            <div>
              <h2 className="text-2xl font-bold text-cente text-gray-700 px-5">Agregar Actividad</h2>
              <Form
              dispatch={dispatch}
              state={state}
            />
            </div>          
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-700">Actividades</h2>
              <ActivityList 
              activities={state.activities}
              dispatch={dispatch}         
            />
            </div>
            
            <div className="bg-gray-800 py-10">
              <h2 className="text-2xl font-bold text-center text-white">Total de Calorías</h2>
              <div className="text-1xl text-center text-white font-bold">
                <CalorieTracker
                  activities={state.activities}
                />
              </div>
                       
            </div>
          </div>
      
          
        </section>
      </>
    )
}

export default App
