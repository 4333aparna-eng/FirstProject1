import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startLocation: string;

    @Column()
    endLocation: string;

    @Column()
    distance: number;

    @Column()
    duration: number;

    @Column()
    ecoFriendlyScore: number;

    @Column()
    cost: number;

    @Column()
    congestionLevel: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}