export async function fetchDataProduct(definition, params, source = "ioxio") {
  const api = "/api/data-product"
  // In this application we use data products that are published under
  //  "ioxio" source only
  const resp = await fetch(`${api}/${definition}?source=${source}`, {
    method: "POST",
    body: JSON.stringify(params),
  })
  return {
    ok: resp.ok,
    status: resp.status,
    data: await resp.json(),
  }
}

export async function getDataspaceConfiguration() {
  const resp = await fetch("/api/settings")
  if (!resp.ok) {
    throw new Error("Failed to fetch the dataspace configuration")
  }
  return await resp.json()
}
