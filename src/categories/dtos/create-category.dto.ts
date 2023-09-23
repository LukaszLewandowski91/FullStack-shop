import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  description: string;
}
