import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  // SWAGGER API
  const config = new DocumentBuilder().setTitle('Park Hunt | DracoR22').setDescription(
    `The Park Hunt API.
    <h2>Looking for the graphql api?</h2>
    Go to <a href="/graphql" target="_blank">/graphql</a>.
     Or,
    You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{ uid }}
    ">Apollo explorer</a> for a greater experience.`,
  )

  await app.listen(3000)
}
bootstrap()
