import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ){}

 async create(createPessoaDto: CreatePessoaDto) {
  try {

   const dadosPessoa = {
      nome: createPessoaDto.nome,
      passwordHash: createPessoaDto.password,
      email: createPessoaDto.email,
    };

    const novaPessoa = this.pessoaRepository.create(dadosPessoa);
    await this.pessoaRepository.save(novaPessoa);
    return novaPessoa;

    } catch (error) {
      if(error.code === '23505'){
        throw new ConflictException('O E-mail já está cadastrado.');
      }
      throw error;
    }
  }

  async findAll() {
    const pessoas = this.pessoaRepository.find({
      order: {
        id: 'desc',
      },
    });

    return pessoas;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({
      id,
    });

    if(!pessoa) {
      throw new NotFoundException('Pessoa não encontrada')
    }

    return this.pessoaRepository.remove(pessoa);
  }
}
