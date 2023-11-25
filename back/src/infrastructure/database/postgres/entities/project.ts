import { ProjectM } from '@/domain/entities';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('projects')
export class PgProject implements ProjectM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  id_user: string;
  @Column()
  id_organization: string;
  @Column()
  nm_project: string;
  @Column()
  created_by: string;
  @CreateDateColumn()
  created_at?: Date;
  @UpdateDateColumn()
  updated_at?: Date;
  @DeleteDateColumn()
  deleted_at?: Date;
}
