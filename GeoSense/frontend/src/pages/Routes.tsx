import React from 'react';
import { RouteCard } from '../components/RouteComparison/RouteCard';
import { useTraffic } from '../hooks/useTraffic';
import './Routes.css';

const Routes: React.FC = () => {
    const { routes, loading, error } = useTraffic();

    if (loading) {
        return <div className="loading">Loading routes...</div>;
    }

    if (error) {
        return <div className="error">Error loading routes: {error.message}</div>;
    }

    return (
        <div className="routes-container">
            <h1 className="routes-heading">Explore Your Routes</h1>
            <div className="routes-list">
                {routes.map(route => (
                    <RouteCard key={route.id} route={route} />
                ))}
            </div>
        </div>
    );
};

export default Routes;