

# 💻Bans Library App
<p align="center">
  <img alt="David" src="https://img.shields.io/david/banisholih23/bans-library-apps">
  <a href="https://github.com/banisholih23?tab=followers">
    <img title="Followers" src="https://img.shields.io/github/followers/banisholih23?style=social">
  </a>
  <a href="#">
    <img title="Repo Size" src="https://img.shields.io/github/repo-size/banisholih23/bans-library-apps">
  </a>
  <a href="https://github.com/banisholih23/bans-library-apps/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/banisholih23/bans-library-apps?style=social">
  </a>
  <img alt="GitHub last commit (branch)" src="https://img.shields.io/github/last-commit/banisholih23/bans-library-apps/master">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/banisholih23/bans-library-apps/total">
 </p>
 
 ## Build Setup
 
 1. Clone Respository
     `$ https://github.com/banisholih23/bans-library-apps.git`
     
 2. Install Dependencies
 ```bash
 # with npm
 $ npm install <package>
 
 # example :
 $ npm install --save express mysql body-parser
 
 3. Setup your environment variable in `.env` files (create your own)
 
 ```env
 DB_HOST      = 'localhost'
 DB_USER      = 'root'
 DB_PASSWORD  = 'xxx'
 DB_DATABASE  = 'dbname'
 ```
 
 ## Stacks
 
 - NodeJS
 - Mysql
 - ExpressJS
 
 ## Dependencies
 
 - [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
 - [dotenv](https://www.npmjs.com/package/dotenv) - is a zero-dependency module that loads environment variables from a `.env` file into    `process.env`
 - [mysql](https://www.npmjs.com/package/mysql) - NodeJs driver for MySQL
 - [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
 - [nodemon](https://www.npmjs.com/package/nodemon) - is a tool that helps develop node.js based applications by automatically
   the node application when file changes in the directory are detected.
   
 ## Application Structure
 
 - `index.js` - Entry point of our aplication
 - `src/config` - This folder contain configuration files of our app, such as mysql connection
 - `src/controllers` - This folder contain configuration files that links Models to Route
 - `src/models` - This folder containt files that define query of MysQL
 - `src/routes` - Route of our app going here
 
 ---


Copyright © 2020 by Bani Sholih


 
 
 
