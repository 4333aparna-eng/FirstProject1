import { Injectable } from '@nestjs/common';
import { Route } from '../models/route.entity';
import { TrafficService } from './traffic.service';
import { TomTomService } from './tomtom.service';

@Injectable()
export class RoutingService {
    constructor(
        private readonly trafficService: TrafficService,
        private readonly tomTomService: TomTomService,
    ) {}

    async calculateRoute(start: string, end: string, mode: string): Promise<Route> {
        const trafficData = await this.trafficService.getTrafficData(start, end);
        const routeData = await this.tomTomService.getRoute(start, end, mode, trafficData);
        
        return this.createRouteEntity(routeData);
    }

    private createRouteEntity(routeData: any): Route {
        const route = new Route();
        route.distance = routeData.distance;
        route.duration = routeData.duration;
        route.pointsOfInterest = routeData.pointsOfInterest;
        route.congestionLevel = routeData.congestionLevel;

        return route;
    }

    async getAlternativeRoutes(start: string, end: string): Promise<Route[]> {
        const alternativeRoutesData = await this.tomTomService.getAlternativeRoutes(start, end);
        return alternativeRoutesData.map(this.createRouteEntity);
    }
}