import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
        const recado = this.recados.find(item => item.id === +id);

        if(recado) return recado;

        //throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND);
        throw new NotFoundException('RECADO NÃO ENCONTRADO');
    }

    create(body: any) {
        this.lastId++;
        const id = this.lastId;
        const newRecado = {
            id,
            ...body,
        };

        this.recados.push(newRecado);
        return newRecado;
    }

    update(id: string, body: any){  
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );

        if(recadoExistenteIndex >=0){
            const recadoExistente = this.recados[recadoExistenteIndex]

            this.recados[recadoExistenteIndex] = {
                ...recadoExistente,
                ...body,
            }
        }

    }

    remove(id: string){
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );

        if (recadoExistenteIndex >= 0) {
            this.recados.splice(recadoExistenteIndex, 1);
        }
    }
}
