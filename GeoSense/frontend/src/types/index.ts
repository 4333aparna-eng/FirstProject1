export interface Route {
    id: string;
    name: string;
    distance: number;
    duration: number;
    cost: number;
    ecoScore: number;
    congestionLevel: number;
}

export interface PointOfInterest {
    id: string;
    name: string;
    type: string;
    location: {
        latitude: number;
        longitude: number;
    };
    rating: number;
}

export interface TrafficData {
    timestamp: string;
    congestionLevel: number;
    averageSpeed: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    preferences: {
        preferredRouteType: 'fastest' | 'cheapest' | 'eco-friendly';
    };
}

export interface Report {
    id: string;
    userId: string;
    generatedAt: string;
    data: any; // Replace with specific report data structure
}