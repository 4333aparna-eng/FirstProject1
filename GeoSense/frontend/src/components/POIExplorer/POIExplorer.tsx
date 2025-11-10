import React, { useEffect, useState } from 'react';
import { fetchPOIs } from '../../services/api';
import './POIExplorer.css';

const POIExplorer = () => {
    const [pois, setPois] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPOIs = async () => {
            try {
                const data = await fetchPOIs();
                setPois(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPOIs();
    }, []);

    if (loading) {
        return <div className="loading">Loading Points of Interest...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="poi-explorer">
            <h2 className="heading">Explore Points of Interest</h2>
            <ul className="poi-list">
                {pois.map((poi) => (
                    <li key={poi.id} className="poi-item">
                        <h3 className="poi-title">{poi.name}</h3>
                        <p className="poi-description">{poi.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default POIExplorer;