from typing import Set

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # The dataspace base domain
    DATASPACE_BASE_DOMAIN: str = "datafinland.com"

    # Response headers from Product Gateway that gets forwarded in the response
    PRODUCT_GATEWAY_FORWARDED_HEADERS: Set[str] = {"x-powered-by", "server-timing"}

    class Config:
        env_file = ".env"


conf = Settings()
