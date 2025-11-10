import React from 'react';
import { RouteComparison } from '../components/RouteComparison/RouteComparison';
import { Heatmap } from '../components/Heatmap/Heatmap';
import { POIExplorer } from '../components/POIExplorer/POIExplorer';
import { ReportBuilder } from '../components/ReportBuilder/ReportBuilder';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">GeoSense Dashboard</h1>
            <div className="dashboard-content">
                <RouteComparison />
                <Heatmap />
                <POIExplorer />
                <ReportBuilder />
            </div>
        </div>
    );
};

export default Dashboard;