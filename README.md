# Running the Project with Docker

## Prerequisites

Make sure you have Docker installed on your system.

## Steps

1. Clone the Repository.

Clone the project repository to your local machine:

```console
git clone https://github.com/Arina768/news-aggregator.git
cd news-aggregator
```

2. Build the Docker Image.

Build the Docker image using the provided Dockerfile:

```console
docker build -t news-aggregator .
```

3. Run the Docker Container.

Run the Docker container:

```console
docker run -p 3000:3000 news-aggregator
```

4. Access the Application

Open your web browser and navigate to http://localhost:3000 to access the running application.

## Stopping the Container

To stop the running Docker container, use:

```console
docker stop news-aggregator
```

## Cleaning Up

If you want to remove the Docker container:

```console
docker rm news-aggregator
```

And if you want to remove the Docker image:

```console
docker rmi news-aggregator
```
