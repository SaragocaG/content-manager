import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field(type => String, { nullable: false })
  name: string;

  @Field(type => String, { nullable: false })
  email: string;

  @Field(type => String, { nullable: false })
  password: string;

  @Field(type => String, { nullable: false })
  type: string;
}
