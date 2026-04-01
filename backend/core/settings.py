from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_user: str = "root"
    db_password: str = "password"
    db_host: str = "127.0.0.1"
    db_port: int = 3306
    db_name: str = "south_balance_aafes_mvp"

    class Config:
        env_file = ".env"

settings = Settings()