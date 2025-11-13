// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        
        // --- CAMBIO 1: Comenta o elimina esta línea ---
        // port: parseInt(configService.get<string>('DB_PORT') || '1433', 10), 
        
        database: configService.get<string>('DB_NAME') || 'veci-herramientes',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, 
        
        authentication: { // Para Windows Auth
          type: 'default',
          options: {},
        },

        // Opciones específicas para SQL Server en desarrollo
        options: {
          encrypt: false,
          trustServerCertificate: true,
          
          // --- CAMBIO 2: Añade esta línea ---
          instanceName: configService.get<string>('DB_INSTANCE_NAME'), 
        },
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}