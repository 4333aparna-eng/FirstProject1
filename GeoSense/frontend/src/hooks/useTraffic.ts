import { useEffect, useState } from 'react';
import axios from 'axios';

const useTraffic = () => {
    const [trafficData, setTrafficData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrafficData = async () => {
            try {
                const response = await axios.get('/api/traffic');
                setTrafficData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrafficData();
    }, []);

    return { trafficData, loading, error };
};

export default useTraffic;