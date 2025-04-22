import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    texto: string;

    //Muitos recados podem ser enviados por uma unica pessoa (emissor)
    @ManyToOne(() => Pessoa, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'de'})
    de: Pessoa;

    //Muitos recados podem ser enviados por uma unica pessoa (destinatario)
    @ManyToOne(() => Pessoa, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'para'})
    para: Pessoa;

    @Column({ default: false})
    lido: boolean;

    @Column()
    data: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}