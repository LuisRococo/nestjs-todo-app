import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
