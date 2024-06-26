import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('fullname') fullname: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context()
    context: { req: Request },
  ) {
    const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = context.req.user.sub;
    return this.userService.updateProfile(userId, fullname, imageUrl);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFileName = `${uuidv4()}_${filename}}`;
    const imagePath = join(process.cwd(), 'public', uniqueFileName);
    const imageUrl = `${process.env.APP_URL}/${uniqueFileName}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }
}
