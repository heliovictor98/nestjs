import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {

    private lastId = 1;
    private recados: Recado[] = [
        {
            id: 1,
            texto: 'Este é um recado de teste',
            de: 'Joana',
            para: 'João',
            lido: false,
            data: new Date(),
        },
    ];

    findAll(){
        return this.recados;
    }

    findOne(id: string){
        return this.recados.find(item => item.id === +id)
    }
}
