
- Insall Nest CLI
    - sudo npm install -g @nestjs/cli

- Create a new project
    - Open a new terminal in a desired directory.
    - nest new nestjs02
    - Or: - Install NestJS plugin for Webstorm

- npm install class-validator class-transformer

- Execute Project
    - npm run start:dev

- Creating module with CLI
    - In the root directory in the terminal
        - //nest generate module messages
        - nest g module users
        - nest g module reports

- Creating controller with CLI
    - In the root directory in the terminal
        - //nest generate controller messages/messages --flat
        - nest g controller users
        - nest g controller reports

- Create service with CLI
    - In the root directory in the terminal
        - nest g service users
        - nest g service reports

- TypeORM, SQLLite
    - npm install @nestjs/typeorm typeorm sqlite3
    - If you use an ORM Repository files are auto generated. YOu will not create it manually.
    -










****** NOTES ******
- ValidationPipe
    - Create a DTO class
    - Incoming request (JSON) is converted to the DTO class's object by class transformer
    - Then class validator validates the data.

