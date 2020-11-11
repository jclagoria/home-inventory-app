npx knex init

npx knex migrate:make initial
later ->  npm run migrate -- Ad command to npm
later -> npm run rollback -- Ad command to npm

npx knex seeds:make initial

ejecute for jtw-secret ->> node -e "console.log(require('crypto').randomBytes(100).toString('hex'))"

-----

    # Knex Setup Guide
    
    ## Create your project directory
    
    Create and initialize your a directory for your Express application.
    
    ```bash
    $ mkdir node-knex-demo
    $ cd node-knex-demo
    $ npm init
    ```
    ## Knex
    
    Knex is a SQL query builder, mainly used for Node.js applications with built in model schema creation, table migrations, connection pooling and seeding.
    
    ### Install Knex and Knex Command Line Tool
    
    Install `knex` __globally__ on your local computer.
    
    ```bash
    $ npm install knex -g
    ```
    
    This will allow us to use `knex` as a command line tool that helps you create and manage your knex files.
    
    In addition, you will need to also install the `knex` module __locally__ to use in your project.
    
    ```bash
    $ npm install knex --save
    ```
    
    ## Configuring your database
    
    For our example, we're going to be connecting to a PostgreSQL database, we'll need to install the `pg` module.
    
    ```
    $ npm install pg --save
    ```
    
    We can start by creating a `knexfile.js` in the root of your project which will act as our configuration for different environments, (e.g. – local development vs production).
    
    ```
    $ knex init
    ```
    
    This will create a `knexfile.js` with the different configurations for the different environments.
    
    **Generated output `knexfile.js`**.
    
    ```javascript
    module.exports = {
      development: {
        client: 'sqlite3',
        connection: {
          filename: './dev.sqlite3'
        }
      },
      staging: {
        client: 'postgresql',
        connection: {
          database: 'my_db',
          user:     'username',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations'
        }
      },
      production: {
        client: 'postgresql',
        connection: {
          database: 'my_db',
          user:     'username',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations'
        }
      }
    };
    
    ```
    Edit your `development` settings in `knexfile.js` to point to your postgres database, using your db username and password. DON'T FORGET TO CREATE YOUR DATABASE LOCALLY!
    
    **Example `development` config object**
    
    ```javascript
    {
      development: {
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : '[db_username]',
          password : '[db_password]',
          database : '[db_name]',
          charset: 'utf8'
        },
        migrations: {
          directory: __dirname + '/knex/migrations',
        },
        seeds: {
          directory: __dirname + '/knex/seeds'
        }
      }
    }
    ```
    
    We want to create a `knex`  directory at the root of our project to hold our `migrations` and `seeds` scripts. Inside of the `knex` directory, we need a `knex.js` file to hold the single instance of the `knex` module with the correct environment config.
    
    
    ```bash
    $ mkdir knex
    $ mkdir knex/migrations
    $ mkdir knex/seeds
    $ touch knex/knex.js
    ```
    
    At this point, our project structure should look like this:
    
    ```
    .
    ├── knex
    │   └── migrations
    │   └── seeds
    │   └── knex.js
    └── knexfile.js
    └── package.json
