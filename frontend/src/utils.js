export async function fetchDataProduct(definition, params, source = "ioxio") {
  const api = "/api/data-product"
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
