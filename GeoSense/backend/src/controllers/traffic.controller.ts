import { Request, Response } from 'express';
import { TrafficService } from '../services/routing.service';

export class TrafficController {
    private trafficService: TrafficService;

    constructor() {
        this.trafficService = new TrafficService();
    }

    public async getTrafficData(req: Request, res: Response): Promise<void> {
        try {
            const { origin, destination } = req.query;
            const trafficData = await this.trafficService.fetchTrafficData(origin as string, destination as string);
            res.status(200).json(trafficData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching traffic data', error });
        }
    }

    public async getCongestionHeatmap(req: Request, res: Response): Promise<void> {
        try {
            const heatmapData = await this.trafficService.fetchCongestionHeatmap();
            res.status(200).json(heatmapData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching congestion heatmap', error });
        }
    }

    public async getRouteComparison(req: Request, res: Response): Promise<void> {
        try {
            const { origin, destination } = req.query;
            const comparisonData = await this.trafficService.compareRoutes(origin as string, destination as string);
            res.status(200).json(comparisonData);
        } catch (error) {
            res.status(500).json({ message: 'Error comparing routes', error });
        }
    }
}