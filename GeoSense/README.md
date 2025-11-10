# GeoSense

GeoSense is an urban mobility analytics and smart routing platform designed to provide powerful, actionable insights for city travelers and planners. By leveraging real-time traffic, location, and Points of Interest (POI) data, GeoSense enables users to make informed decisions about their urban mobility.

## Features

- **Route Comparison**: Instantly compare three route types: fastest, cheapest, and eco-friendly.
- **Congestion Heatmaps**: Explore interactive heatmaps that visualize traffic congestion across the city.
- **POI Impact Analysis**: Analyze the impact of various points of interest on urban mobility.
- **Personalized Reports**: Generate and download analytical reports tailored to your needs.
- **Interactive Maps**: Utilize stunning map visualizations powered by the TomTom SDK.
- **Machine Learning Integration**: Benefit from advanced machine learning techniques for traffic prediction, clustering, and anomaly detection.
- **Responsive Design**: Enjoy a clean, stylish UI that is accessible across all devices.

## Technologies Used

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL
- **Machine Learning**: Python, scikit-learn
- **Containerization**: Docker, Docker Compose
- **Deployment**: Kubernetes

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MySQL (for local development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/GeoSense.git
   cd GeoSense
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

4. Configure environment variables:
   - Copy the `.env.example` to `.env` and update the values as needed.

5. Start the application using Docker:
   ```
   docker-compose up
   ```

## Usage

- Access the application at `http://localhost:3000`.
- Use the dashboard to explore routes, analyze traffic, and generate reports.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.