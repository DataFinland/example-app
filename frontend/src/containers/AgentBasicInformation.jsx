import React, { useState } from "react"
import Box from "../components/Box"
import AgentBasicInformationData from "../components/AgentBasicInformationData.jsx"
import DataProductLink from "../components/DataProductLink"
import { fetchDataProduct } from "../utils"

const DEFINITION = "NSG/Agent/BasicInformation_v1.0"
const SOURCES = {
  "ioxio:fi": "ioxio:fi",
  "ioxio:no": "ioxio:no",
}
const DEFAULT_SOURCE = "ioxio:fi"
const DEFAULT_NATIONAL_IDENTIFIER = "2464491-9"

export default function AgentBasicInformation() {
  const [nationalIdentifier, setNationalIdentifier] = useState(
    DEFAULT_NATIONAL_IDENTIFIER
  )
  const [source, setSource] = useState(DEFAULT_SOURCE)

  const [isFetching, setIsFetching] = useState(false)
  const [basicInformation, setBasicInformation] = useState({})

  function updateSource(event) {
    const source = event.target.value
    setSource(source)
  }

  async function fetchBasicInformation(event) {
    event.preventDefault()
    setIsFetching(true)
    const resp = await fetchDataProduct(DEFINITION, { nationalIdentifier }, source)
    if (resp.ok) {
      // Add the national identifier to the data; it's not included in the response
      resp.data["nationalIdentifier"] = nationalIdentifier
      setBasicInformation(resp.data)
    } else {
      throw new Error("Failed to fetch basic information")
    }
    setIsFetching(false)
  }

  return (
    <Box title="Data retrieval">
      <div className="basic-information">
        <div className="main-box">
          <form onSubmit={fetchBasicInformation}>
            <div>
              <div>Source</div>
              <select onChange={updateSource} value={source}>
                {Object.keys(SOURCES).map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>
            </div>
            <div>
              <div>National Identifier</div>
              <input
                value={nationalIdentifier}
                onChange={(e) => setNationalIdentifier(e.target.value)}
              />
            </div>
            <button type="submit">Fetch</button>
          </form>
          <div>
            {isFetching && <i>Loading...</i>}
            {!isFetching && basicInformation.legalForm !== undefined && (
              <AgentBasicInformationData basicInformation={basicInformation} />
            )}
          </div>
        </div>
        <p>
          By clicking "Fetch", you will request data from{" "}
          <DataProductLink definition={DEFINITION} source={source} />
        </p>
      </div>
    </Box>
  )
}
