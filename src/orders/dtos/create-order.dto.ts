// id String @id @default(uuid())
//   firstName String
//   lastName String
//   address String
//   city String
//   phoneNumber String
//   email String
//   deliveryType String
//   amountPay Float
//   amountProducts Int
//   client User @relation(fields: [userId], references: [id])
//   userId String

import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

//   order OrderDetails[]

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  deliveryType: string;

  @IsNotEmpty()
  @IsNumber()
  amountPay: number;

  @IsNotEmpty()
  @IsNumber()
  amountProducts: number;

  @IsArray()
  @ArrayNotEmpty()
  order: Array<string>;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
