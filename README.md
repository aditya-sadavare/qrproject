# Automated CI/CD Pipeline for QR Code Management

## Overview

This project demonstrates an automated CI/CD pipeline for a QR code management system using Docker, Jenkins, and GitHub Actions.

## Tech Stack

- **Frontend**: React.js, Docker
- **Backend**: Node.js, Express.js, Docker
- **Database**: MongoDB, Docker
- **CI/CD**: Jenkins, GitHub Actions, Docker Compose
- **Version Control**: Git, GitHub
- **OS**: Ubuntu

## Project Workflow

1. **Code Push**: Developers push code changes to the GitHub repository.
2. **CI Trigger**: GitHub Actions or Jenkins detects the push and triggers the CI pipeline.
3. **Build**: The application is built using Docker, creating images for the frontend, backend, and MongoDB.
4. **Deploy**: Docker Compose is used to deploy the application and database containers.

## Agent-Master Architecture

- **Jenkins Master**: This is the central server where Jenkins is installed. It manages the build process, schedules jobs, and handles the user interface.
- **Jenkins Agent**: This is a separate machine or container where Docker is installed. The agent executes the build, test, and deployment tasks delegated by the Jenkins Master. This separation helps scale builds and isolates environments.

## Docker Network & Volumes

- **Network**: All containers (frontend, backend, MongoDB) are connected to a shared Docker network, allowing them to communicate with each other.
- **Volumes**: Persistent storage is configured for MongoDB to retain data across container restarts.

## Demo

Watch the demo video of the full project workflow here:  
[![Project Demo](https://img.youtube.com/vi/EFL3ABgS6ew/0.jpg)](https://youtu.be/EFL3ABgS6ew)
