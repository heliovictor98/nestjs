import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';



// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

@Controller('recados')
export class RecadosController {

    // Encontrar todos os recados
    @Get()
    findAll(@Query() pagination: any) {
        const {limit = 10, offset = 0} = pagination;
        return `Essa rota retorna todos os recados. Limit= ${limit} , Offset= ${offset}`;
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

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any){
        return {
            id,
            ...body
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return `Essa rota APAGA o recado ID ${id}`
    }

    
}
