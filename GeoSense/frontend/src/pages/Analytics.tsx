import React, { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '../services/api';
import './Analytics.css';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchAnalyticsData();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error fetching data: {error.message}</div>;
    }

    return (
        <div className="analytics-container">
            <h1 className="analytics-heading">Analytics Insights</h1>
            <div className="analytics-content">
                {/* Render your analytics data here */}
                {data && data.map((item, index) => (
                    <div key={index} className="analytics-item">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;