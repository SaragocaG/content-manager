import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(type => Int)
  id: number;

  @Field(type => String, { nullable: false })
  name: string;

  @Field(type => String, { nullable: false })
  description: string;

  @Field(type => String, { nullable: false })
  type: string;
}
