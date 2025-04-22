import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { urlToHttpOptions } from 'url';

@Injectable()
export class RecadosService {

    constructor(
        @InjectRepository(Recado)
        private readonly recadoRepository: Repository<Recado>,
    ) {}

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

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    //const recado =  this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    })
    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    console.log(recado);
    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    }
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto
    });

    if(!recado) {
      //console.log('Recado não encontrado!');
      return this.throwNotFoundError();
    } else {
      console.log('Recado Atualizado:', recado.id);
      return this.recadoRepository.save(recado);
    }
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });

    if(!recado) {
      //console.log('Recado não encontrado!');
      return this.throwNotFoundError();
    } else {
      console.log('Recado Deletado:', recado.id);
      return this.recadoRepository.remove(recado);
    }
  }
}