import React, { useState } from "react"
import Box from "../components/Box"
import AgentBasicInformationData from "../components/AgentBasicInformationData.jsx"
import DataProductLink from "../components/DataProductLink"
import { fetchDataProduct } from "../utils"

const DEFINITION = "NSG/Agent/BasicInformation_v1.0"
const SOURCES = {
  "ioxio:fi": "Patentti- ja rekisterihallitus",
  "ioxio:no": "Brønnøysundregistrene",
}
const DEFAULT_SOURCE = "ioxio:fi"
const DEFAULT_NATIONAL_IDENTIFIERS = {
  "ioxio:fi": "2464491-9",
  "ioxio:no": "923609016",
}

export default function AgentBasicInformation() {
  const [nationalIdentifier, setNationalIdentifier] = useState(
    DEFAULT_NATIONAL_IDENTIFIERS[DEFAULT_SOURCE]
  )
  const [source, setSource] = useState(DEFAULT_SOURCE)

  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [basicInformation, setBasicInformation] = useState({})

  function updateSource(event) {
    const source = event.target.value
    setSource(source)
    setNationalIdentifier(DEFAULT_NATIONAL_IDENTIFIERS[source])
  }

  async function fetchBasicInformation(event) {
    event.preventDefault()
    try {
        setIsFetching(true)
        const resp = await fetchDataProduct(DEFINITION, { nationalIdentifier }, source)
        if (resp.ok) {
          // Add the national identifier to the data; it's not included in the response
          resp.data["nationalIdentifier"] = nationalIdentifier
          setBasicInformation(resp.data)
          setIsError(false)
        } else {
          setIsError(true)
          throw new Error("Failed to fetch basic information")
        }
    } finally {
        setIsFetching(false)
    }
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
                  <option key={source} value={source}>
                    {SOURCES[source]}
                  </option>
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
            {!isFetching && isError && <i>Error, failed to fetch data.</i>}
            {!isFetching && !isError && basicInformation.legalForm !== undefined && (
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
