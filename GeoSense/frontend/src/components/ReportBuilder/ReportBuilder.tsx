import React, { useState } from 'react';
import { generateReport } from '../../services/api';
import './ReportBuilder.css';

const ReportBuilder: React.FC = () => {
    const [reportType, setReportType] = useState<string>('summary');
    const [dateRange, setDateRange] = useState<string>('last_week');
    const [loading, setLoading] = useState<boolean>(false);
    const [report, setReport] = useState<string | null>(null);

    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            const generatedReport = await generateReport(reportType, dateRange);
            setReport(generatedReport);
        } catch (error) {
            console.error('Error generating report:', error);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-builder">
            <h2 className="report-title">Generate Report</h2>
            <div className="report-options">
                <label>
                    <span>Report Type:</span>
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="summary">Summary</option>
                        <option value="detailed">Detailed</option>
                    </select>
                </label>
                <label>
                    <span>Date Range:</span>
                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                        <option value="last_week">Last Week</option>
                        <option value="last_month">Last Month</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
            </div>
            <button onClick={handleGenerateReport} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Report'}
            </button>
            {report && (
                <div className="report-output">
                    <h3>Report Output</h3>
                    <pre>{report}</pre>
                </div>
            )}
        </div>
    );
};

export default ReportBuilder;