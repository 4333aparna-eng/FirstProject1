import { Request, Response } from 'express';
import { db } from '../db';
import { Report } from '../models/report.entity';

class ReportService {
    async generateReport(userId: string, reportData: any): Promise<Report> {
        const report = new Report();
        report.userId = userId;
        report.data = reportData;
        report.createdAt = new Date();

        await db.getRepository(Report).save(report);
        return report;
    }

    async getReportsByUser(userId: string): Promise<Report[]> {
        return await db.getRepository(Report).find({ where: { userId } });
    }

    async deleteReport(reportId: string): Promise<void> {
        await db.getRepository(Report).delete(reportId);
    }
}

export const reportService = new ReportService();