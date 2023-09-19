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

//   order OrderDetails[]

export class CreateOrderDTO {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  deliveryType: string;
  amountPay: number;
  amountProducts: number;
  order: Array<string>;
  userId: string;
}
