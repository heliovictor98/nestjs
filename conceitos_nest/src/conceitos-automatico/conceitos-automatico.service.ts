import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {

    getHome(){
        return 'Conceitos Automatico Da Service !!!!';
    }
}
