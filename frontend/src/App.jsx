import { useState, useEffect } from 'react'
import GlobalData from './Classes/GlobalData'
import { GlobalContext } from './Context/GlobalContext'
import Layout from './Components/Layout'
import TaskList from './Components/TaskList'
import { getTasks, updateFinished } from './Services/FetchServices'
import CreateTask from './Components/CreateTask'

function App() {
  const [globalData, setGlobalData] = useState(new GlobalData())

    const [finishedTasks, setFinishedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [errorData, setErrorData] = useState({})

    const loadData = async () => {
        let fetchedTasks = await getTasks(globalData, false, setErrorData);
        setPendingTasks(fetchedTasks);
        fetchedTasks = await getTasks(globalData, true, setErrorData);
        setFinishedTasks(fetchedTasks);
    }

    const setChecked = async(id, finished) => {
        await updateFinished(globalData, id, finished, setErrorData)
        await loadData()
    }

    useEffect(() => {
        loadData()
    }, [])

  return (
    <GlobalContext.Provider value={{globalData, setGlobalData}}>
      <Layout>
        <CreateTask
          reloadData={loadData}
          setErrorData={setErrorData}
        />
        <TaskList
          title="Pending tasks"
          tasks={pendingTasks}
          setChecked={setChecked}
          actionText="Mark as finished"
        />
        <TaskList
          title="Finished tasks"
          tasks={finishedTasks}
          setChecked={setChecked}
          actionText="Mark as pending"
        />
      </Layout>
    </GlobalContext.Provider>
  )
}

export default App
