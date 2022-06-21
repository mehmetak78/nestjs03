
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
    - Install Webstorm Plugin DatabaseTools And SQL for Webstorm
            - https://www.jetbrains.com/help/webstorm/sqlite.html
            - or have notes in my Mac's Notes application (TypeOrm, SQLite)



****** NOTES ******
- ValidationPipe
    - Create a DTO class
    - Incoming request (JSON) is converted to the DTO class's object by class transformer
    - Then class validator validates the data.

- Installing Webstorm Plugin (Must be licensed 30$)
  (Or check for https://www.dbvis.com/database/sqlite/ ) for free visualizer tool for SQLite
  
  - Preferences/Plugins
      - https://www.jetbrains.com/help/webstorm/sqlite.html
      - Install Database Tools and SQL for Webstorm
  * In the Database tool window (View | Tool Windows | Database), 
    click the Data Source Properties icon  Select File | Data Sources.
    (Or double click the file in your project. For ex project : db.sqlite) and do the following steps.
  * On the Data Sources tab in the Data Sources and Drivers dialog, click the Add icon (+) and select SQLite.
  * At the bottom of the data source settings area, click the Download missing driver files link.
  * To connect to an existing SQLite database, specify a file path to the database file in the File field.
    To create a new SQLite database, change the default name of the database if needed identifier.sqlite and click OK.
    Also, to create a database, you can drag an SQLite DB file to the Database tool window.
  * To ensure that the connection to the data source is successful, click the Test Connection link.

