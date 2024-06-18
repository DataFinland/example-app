# Data Finland example app

This demo application is designed to show a practical example on how to create an
application that connects to a Dataspace built with the IOXIO Dataspace technology.

It consists of a simple Python [FastAPI](https://fastapi.tiangolo.com) backend that is
responsible for authentication and data retrieval and React-based frontend application.

You can try the [online demo](https://df-example-app.ioxio.dev) or check the
[configuration](#configuration) section for instructions on how to run this code
locally.

Main idea is to demonstrate how to:

- Retrieve data products from Product Gateway

## Repo structure

- [backend](./backend/) - Python [FastAPI](https://fastapi.tiangolo.com/) backend
  - [main.py](./backend/app/main.py) - All the backend routes, e.g. for data retrieval
  - [settings.py](./backend/app/settings.py) - Backend configuration
- [frontend](./frontend) - React application
  - [containers](./frontend/src/containers) - Root containers for handling data products
  - [components](./frontend/src/components) - Stateless components to simplify following
    the containers' logic
  - [utils](./frontend/src/utils) - Some helpers, e.g. for making network requests to
    the backend

## Local installation

### Pre-requisites

- [Python 3.11 or 3.12](https://www.python.org/) - For running the backend
- [Poetry 1.8.2+](https://python-poetry.org/) - Python dependency management tool
- [Node 18+](https://nodejs.org/en/) - For running the frontend
- [pnpm 8.15+](https://pnpm.io/) - Node package manager
- [pre-commit](https://pre-commit.com/) - Runs hooks before you commit to e.g. format
  your code. Make sure you run `pre-commit install` after checking out the repo.

### Backend

```bash
cd backend
poetry install

poetry run dev
```

### Frontend

```bash
cd frontend
pnpm install

pnpm dev
```

Then open http://localhost:3000 in your browser.
