import React from 'react';
import './MapLegend.css';

const MapLegend = () => {
    return (
        <div className="map-legend">
            <h2 className="legend-title">Map Legend</h2>
            <ul className="legend-items">
                <li>
                    <span className="legend-icon fast-route"></span>
                    <span className="legend-label">Fastest Route</span>
                </li>
                <li>
                    <span className="legend-icon cheap-route"></span>
                    <span className="legend-label">Cheapest Route</span>
                </li>
                <li>
                    <span className="legend-icon eco-route"></span>
                    <span className="legend-label">Eco-Friendly Route</span>
                </li>
                <li>
                    <span className="legend-icon congestion"></span>
                    <span className="legend-label">Congestion Areas</span>
                </li>
                <li>
                    <span className="legend-icon poi"></span>
                    <span className="legend-label">Points of Interest</span>
                </li>
            </ul>
        </div>
    );
};

export default MapLegend;