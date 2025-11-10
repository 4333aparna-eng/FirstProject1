import axios from 'axios';

const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;
const TOMTOM_BASE_URL = 'https://api.tomtom.com';

export const getTrafficData = async (location) => {
    try {
        const response = await axios.get(`${TOMTOM_BASE_URL}/traffic/services/traffic/incidents/json?key=${TOMTOM_API_KEY}&location=${location}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        throw error;
    }
};

export const getRouteDetails = async (start, end) => {
    try {
        const response = await axios.get(`${TOMTOM_BASE_URL}/routing/1/calculateRoute/${start}:${end}/json?key=${TOMTOM_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching route details:', error);
        throw error;
    }
};

export const getPOIData = async (location) => {
    try {
        const response = await axios.get(`${TOMTOM_BASE_URL}/search/2/search.json?key=${TOMTOM_API_KEY}&lat=${location.lat}&lon=${location.lon}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching POI data:', error);
        throw error;
    }
};