import { IUsage } from '../../Interface'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Usage implements IUsage {
    @PrimaryColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 20 })
    chatflowid: string

    @Column({ type: 'varchar', length: 20 })
    chatid: string

    @Column({ type: 'varchar', length: 20 })
    runid: string

    @Column({ type: 'text' })
    model: string

    @Column()
    date: Date

    @Column()
    usage: number
}
