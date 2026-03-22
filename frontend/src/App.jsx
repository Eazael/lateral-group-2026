import { useState } from 'react'
import GlobalData from './Classes/GlobalData'
import { GlobalContext } from './Context/GlobalContext'
import Layout from './Components/Layout'

function App() {
  const [globalData, setGlobalData] = useState(new GlobalData())

  return (
    <GlobalContext.Provider value={(globalData, setGlobalData)}>
      <Layout>
        as
      </Layout>
    </GlobalContext.Provider>
  )
}

export default App
