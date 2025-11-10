import React from 'react';
import './RouteComparison.css';
import RouteCard from './RouteCard';

const RouteComparison = ({ routes }) => {
    return (
        <div className="route-comparison">
            <h2 className="route-comparison__heading">Compare Your Routes</h2>
            <div className="route-comparison__cards">
                {routes.map((route, index) => (
                    <RouteCard key={index} route={route} />
                ))}
            </div>
        </div>
    );
};

export default RouteComparison;