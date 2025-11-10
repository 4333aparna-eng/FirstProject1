import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState({
        trafficAlerts: true,
        ecoRouting: true,
        reportFrequency: 'weekly',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save settings logic here
        console.log('Settings saved:', settings);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-heading">Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="trafficAlerts"
                            checked={settings.trafficAlerts}
                            onChange={handleChange}
                        />
                        Enable Traffic Alerts
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="ecoRouting"
                            checked={settings.ecoRouting}
                            onChange={handleChange}
                        />
                        Enable Eco-Friendly Routing
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="reportFrequency">Report Frequency:</label>
                    <select
                        name="reportFrequency"
                        value={settings.reportFrequency}
                        onChange={handleChange}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <button type="submit" className="settings-button">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;