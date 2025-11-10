import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('points_of_interest')
export class PointOfInterest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: 0 })
    rating: number;

    @Column({ default: 0 })
    visitCount: number;
}