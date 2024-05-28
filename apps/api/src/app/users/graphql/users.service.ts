import { BadRequestException, Injectable } from '@nestjs/common'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { PrismaService } from '../../../common/prisma/prisma.service'
import { UpdateUserInput } from './dtos/update-user.input'
import { RegisterWithCredentialsInput, RegisterWithProviderInput } from './dtos/create-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async registerWithProvider({ name, type, uid, image }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  async registerWithCredentials({ email, name, password, image }: RegisterWithCredentialsInput) {
    // Check If user exists
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new BadRequestException('User already exists with this email')
    }

    // Hash the password
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
