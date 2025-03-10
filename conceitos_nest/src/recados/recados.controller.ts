import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    // Encontrar todos os recados
    @Get()
    findAll() {
        return 'Essa rota retorna todos os recados!!';
    }

    // Encontrar Um recado
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return `Essa rota retorna um recado!! ID ${id}`;
    }

    @Post()
    create(@Body() body: any){
        return  body;
    }

    
}
