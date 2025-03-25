import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateRecadoDto } from "./create-recado.dto";

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  
}
