# GeoSense API Documentation

## Overview
GeoSense provides a set of RESTful APIs that enable interaction with the urban mobility analytics and smart routing platform. The APIs allow users to access traffic data, points of interest (POI), route comparisons, and analytical reports.

## Base URL
The base URL for all API requests is:
```
http://localhost:5000/api
```

## Authentication
All API requests require authentication. Use the following header for authentication:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Traffic Data

#### Get Traffic Data
- **Endpoint:** `/traffic`
- **Method:** `GET`
- **Description:** Retrieve real-time traffic data.
- **Response:**
  - `200 OK`: Returns traffic data.
  - `401 Unauthorized`: Invalid or missing token.

#### Predict Traffic
- **Endpoint:** `/traffic/predict`
- **Method:** `POST`
- **Description:** Predict traffic conditions based on historical data.
- **Request Body:**
  ```json
  {
    "location": {
      "latitude": <float>,
      "longitude": <float>
    },
    "time": "<ISO 8601 timestamp>"
  }
  ```
- **Response:**
  - `200 OK`: Returns predicted traffic conditions.
  - `400 Bad Request`: Invalid input data.

### 2. Points of Interest (POI)

#### Get POIs
- **Endpoint:** `/poi`
- **Method:** `GET`
- **Description:** Retrieve a list of points of interest.
- **Response:**
  - `200 OK`: Returns a list of POIs.
  - `401 Unauthorized`: Invalid or missing token.

#### Add POI
- **Endpoint:** `/poi`
- **Method:** `POST`
- **Description:** Add a new point of interest.
- **Request Body:**
  ```json
  {
    "name": "<string>",
    "location": {
      "latitude": <float>,
      "longitude": <float>
    },
    "type": "<string>"
  }
  ```
- **Response:**
  - `201 Created`: POI successfully added.
  - `400 Bad Request`: Invalid input data.

### 3. Route Comparison

#### Compare Routes
- **Endpoint:** `/routes/compare`
- **Method:** `POST`
- **Description:** Compare different route options.
- **Request Body:**
  ```json
  {
    "start": {
      "latitude": <float>,
      "longitude": <float>
    },
    "end": {
      "latitude": <float>,
      "longitude": <float>
    },
    "options": ["fastest", "cheapest", "eco-friendly"]
  }
  ```
- **Response:**
  - `200 OK`: Returns comparison of routes.
  - `400 Bad Request`: Invalid input data.

### 4. Reports

#### Generate Report
- **Endpoint:** `/reports`
- **Method:** `POST`
- **Description:** Generate an analytical report based on user data.
- **Request Body:**
  ```json
  {
    "userId": "<string>",
    "reportType": "<string>"
  }
  ```
- **Response:**
  - `200 OK`: Returns the generated report.
  - `401 Unauthorized`: Invalid or missing token.

## Error Handling
All API responses include an error message in the following format:
```json
{
  "error": {
    "code": <integer>,
    "message": "<string>"
  }
}
```

## Conclusion
This API documentation provides a comprehensive overview of the available endpoints for the GeoSense platform. For further assistance, please refer to the support section or contact the development team.