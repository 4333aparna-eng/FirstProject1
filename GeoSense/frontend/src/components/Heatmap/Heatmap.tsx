import React, { useEffect, useState } from 'react';
import { HeatMap, Tooltip } from 'react-leaflet-heatmap-layer';
import { fetchHeatmapData } from '../../services/api';
import './Heatmap.css';

const Heatmap = () => {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchHeatmapData();
            setHeatmapData(data);
        };
        getData();
    }, []);

    return (
        <div className="heatmap-container">
            <h2 className="heatmap-title">Congestion Heatmap</h2>
            <HeatMap
                points={heatmapData}
                longitudeExtractor={m => m.longitude}
                latitudeExtractor={m => m.latitude}
                intensityExtractor={m => m.intensity}
                blur={15}
                radius={25}
            >
                <Tooltip>
                    <span>Traffic Density</span>
                </Tooltip>
            </HeatMap>
        </div>
    );
};

export default Heatmap;