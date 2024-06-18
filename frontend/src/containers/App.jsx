import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import AgentBasicInformation from "./AgentBasicInformation"
import { getDataspaceConfiguration } from "../utils.js"
import DataspaceConfigurationContext from "../context/dataspaceConfigurationContext"

function App() {
  const [dataspaceConfiguration, setDataspaceConfiguration] = useState({
    dataspaceBaseUrl: "https://datafinland.com",
    definitionViewerUrl: "https://definitions.datafinland.com",
    dataspaceName: "Data Finland",
  })
  useEffect(() => {
    async function fetchData() {
      const data = await getDataspaceConfiguration()
      setDataspaceConfiguration(data)
    }
    fetchData()
  }, [])

  return (
    <DataspaceConfigurationContext.Provider value={dataspaceConfiguration}>
      <div className="app">
        <Navbar />
        <AgentBasicInformation />
      </div>
    </DataspaceConfigurationContext.Provider>
  )
}

export default App
