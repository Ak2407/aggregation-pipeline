import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  address: string;
}

@Schema()
export class Company {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Location, required: true })
  location: Location;
}

@Schema()
export class User {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  registered: Date;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  eyeColor: string;

  @Prop({ required: true })
  favoriteFruit: string;

  @Prop({ type: Company, required: true })
  company: Company;

  @Prop({ type: [String], required: true })
  tags: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
