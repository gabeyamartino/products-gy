# System Design Capstone: Atlier Retail - Overview


## Overview
This backend application was built using PostgreSQL and Express.js. The frontend for Atlier Retail, an e-commerce website, was inherited as legacy code. Previously, data was stored and received on a hosted API, taking around 40-50ms to make requests. As web traffic increased, we needed to build a scalable backend to handle an increase in requests per second while optimizing performance. This application is specifically for the product overview section.

## Table of Contents
* [Tech Stack](https://github.com/huongnguyen04/dinner-party/blob/main/README.md#tech-stack)  
* [Description](https://github.com/huongnguyen04/dinner-party/blob/main/README.md#description)  
* [Installation](https://github.com/huongnguyen04/dinner-party/blob/main/README.md#installation)  

## Tech Stack
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## Description
To improve user experience, the reduction in request latency was prioritized. Data was stored in a PostgreSQL database using indexing and JSON aggregate techniques. Proactive measures were taken to protect from SQL injection attacks to avoid data breaches. In development, application was tested using K6. In production, application was tested using Loader.io. Application was deployed on an EC2 micro instance, with load balancing and Nginx caching for full performance optimization. As a result, all queries came out to be under 10ms with some under 5ms.


## Installation
From the root directory, run the following commands in your terminal.

1. To install all dependencies

```
npm install
```

2. To run the server, run the following command:
```
npm start
```
