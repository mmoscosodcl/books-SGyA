import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min,IsDateString } from 'class-validator';
import { BOOK_FORMAT } from '../../../../domain/models/book';
import { IsIsbn13 } from '../../common/validators/isbn13.validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  autor!: string;

  @IsString()
  @IsNotEmpty()
  @IsIsbn13()
  isbn13!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsIn(Object.values(BOOK_FORMAT))
  formato!: (typeof BOOK_FORMAT)[keyof typeof BOOK_FORMAT];

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  precio!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock!: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  discontinued?: boolean;

  @IsNotEmpty()
  @IsDateString()
  publicationDate!: string;

  @IsOptional()
  @IsIn(['Tapa Dura', 'Tapa Blanda'])
  bindingType?: 'Tapa Dura' | 'Tapa Blanda';
}