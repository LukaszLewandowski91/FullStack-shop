import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  producer: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  category: string;
}
