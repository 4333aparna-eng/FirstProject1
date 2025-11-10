import React from 'react';
import './RouteCard.css';

interface RouteCardProps {
    routeName: string;
    duration: string;
    distance: string;
    cost: string;
    ecoScore: number;
    onSelect: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ routeName, duration, distance, cost, ecoScore, onSelect }) => {
    return (
        <div className="route-card" onClick={onSelect}>
            <h2 className="route-card__heading">{routeName}</h2>
            <div className="route-card__details">
                <p><strong>Duration:</strong> {duration}</p>
                <p><strong>Distance:</strong> {distance}</p>
                <p><strong>Cost:</strong> {cost}</p>
                <p><strong>Eco Score:</strong> {ecoScore}</p>
            </div>
        </div>
    );
};

export default RouteCard;