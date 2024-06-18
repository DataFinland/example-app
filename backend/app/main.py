from logging import getLogger

import httpx
from app.dataspace_configuration import get_dataspace_configuration
from app.settings import conf
from fastapi import FastAPI, Query, Request
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter

logger = getLogger(__name__)


app = FastAPI()
api_router = APIRouter()


@api_router.get("/settings")
async def get_settings():
    dataspace_configuration = await get_dataspace_configuration()
    dataspace_base_domain = dataspace_configuration["dataspace_base_domain"]
    return {
        "dataspaceBaseUrl": f"https://{dataspace_base_domain}",
        "definitionViewerUrl": dataspace_configuration["definition_viewer_url"],
        "dataspaceName": dataspace_configuration["dataspace_name"],
    }


@api_router.post("/data-product/{data_product:path}")
async def fetch_data_product(
    data_product: str,
    request: Request,
    source=Query(),
):
    """
    Simple proxy from frontend to Product Gateway.

    Some requests to the Product Gateway require authentication of
    the application, thus we route all the request through the backend.
    """

    body = await request.json()

    async with httpx.AsyncClient() as client:
        dataspace_configuration = await get_dataspace_configuration()
        product_gateway_url = dataspace_configuration["product_gateway_url"]
        resp = await client.post(
            f"{product_gateway_url}/{data_product}",
            params={"source": source},
            json=body,
            timeout=30,
        )
        forwarded_headers = {
            header: value
            for header, value in resp.headers.items()
            if header in conf.PRODUCT_GATEWAY_FORWARDED_HEADERS
        }
    return JSONResponse(resp.json(), resp.status_code, headers=forwarded_headers)


app.include_router(api_router, prefix="/api")


def main():
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
