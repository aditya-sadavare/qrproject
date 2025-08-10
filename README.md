# Automated CI/CD Pipeline for QR Code Management

## Overview

This project demonstrates an automated CI/CD pipeline for a QR code management system using Docker, Jenkins, GitHub Actions, a Groovy Shared Library, webhooks, and multistage pipelines.

## Tech Stack

- **Frontend**: React.js, Docker
- **Backend**: Node.js, Express.js, Docker
- **Database**: MongoDB, Docker
- **CI/CD**: Jenkins, GitHub Actions, Docker Compose, Groovy Shared Library, Webhooks, Multistage Pipelines (using multistage Dockerfile for optimized, smaller images)
- **Version Control**: Git, GitHub
- **OS**: Ubuntu
- **Cloud Hosting**: AWS Free Tier (with 720 hours)

## Project Workflow

1. **Code Push**: Developers push code changes to the GitHub repository.
2. **CI Trigger**: Webhooks from GitHub notify Jenkins or GitHub Actions to start the CI pipeline.
3. **Build**: The application is built using Docker with multistage pipelines creating optimized images for frontend, backend, and MongoDB.
4. **Deploy**: Docker Compose is used to deploy the application and database containers.

## Agent-Master Architecture

- **Jenkins Master**: This is the central server where Jenkins is installed. It manages the build process, schedules jobs, and handles the user interface.
- **Jenkins Agent**: This is a separate machine or container where Docker is installed. The agent executes the build, test, and deployment tasks delegated by the Jenkins Master. This separation helps scale builds and isolates environments.

## Docker Network & Volumes

- **Network**: All containers (frontend, backend, MongoDB) are connected to a shared Docker network, allowing them to communicate with each other.
- **Volumes**: Persistent storage is configured for MongoDB to retain data across container restarts.

## Groovy Shared Library

A Groovy Shared Library is used to modularize and reuse Jenkins pipeline code across multiple jobs, improving maintainability and consistency.

## Dockerfile Optimization

This project uses a multistage Dockerfile to significantly reduce the final image size by building and packaging the frontend and backend separately, then combining them efficiently.

## Cloud Hosting

The entire pipeline and application are hosted on AWS Free Tier, which has a usage limit of 720 hours, suitable for demo and testing purposes.

## Demo

Watch the demo video of the full project workflow here:  
[![Project Demo](https://img.youtube.com/vi/EFL3ABgS6ew/0.jpg)](https://youtu.be/EFL3ABgS6ew)
