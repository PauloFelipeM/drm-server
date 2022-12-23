import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateVideoBody {
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @Length(5, 100)
  title: string;
}
