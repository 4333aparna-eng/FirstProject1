import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchTrafficData = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/traffic`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        throw error;
    }
};

export const fetchPOIData = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/poi`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching POI data:', error);
        throw error;
    }
};

export const fetchRouteOptions = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/routes`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching route options:', error);
        throw error;
    }
};

export const generateReport = async (reportData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/reports`, reportData);
        return response.data;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
};