import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';



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

    constructor(private recadosService: RecadosService){}

    // Encontrar todos os recados
    @Get()
    findAll(@Query() pagination: any) {
        const {limit = 10, offset = 0} = pagination;
        //return `Essa rota retorna todos os recados. Limit= ${limit} , Offset= ${offset}`;
        return this.recadosService.findAll();
    }

    // Encontrar Um recado
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return this.recadosService.findOne(id);
    }

    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto){
        return  this.recadosService.create(createRecadoDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto){
        this.recadosService.update(id, updateRecadoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        this.recadosService.remove(id);
    }

    
}
