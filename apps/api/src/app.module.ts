import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UsersModule } from './app/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from './common/prisma/prisma.module'
import { AdminsModule } from './app/admins/admins.module'
import { ManagersModule } from './app/managers/managers.module'
import { ValetsModule } from './app/valets/valets.module'
import { CompaniesModule } from './app/companies/companies.module'
import { GaragesModule } from './app/garages/garages.module'
import { AddressesModule } from './app/addresses/addresses.module'
import { SlotsModule } from './app/slots/slots.module'
import { BookingsModule } from './app/bookings/bookings.module'
import { BookingTimelinesModule } from './app/booking-timelines/booking-timelines.module'
import { ReviewsModule } from './app/reviews/reviews.module'
import { VerificationsModule } from './app/verifications/verifications.module'

const MAX_AGE = 24 * 60 * 60

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      fieldResolverEnhancers: ['guards'],
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    PrismaModule,

    UsersModule,
    AdminsModule,
    ManagersModule,
    ValetsModule,
    CompaniesModule,
    GaragesModule,
    AddressesModule,
    SlotsModule,
    BookingsModule,
    ValetsModule,
    BookingTimelinesModule,
    ReviewsModule,
    VerificationsModule,
  ],
})
export class AppModule {}
