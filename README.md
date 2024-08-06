# Debug De Blog

## Description

Debug De Blog is a full stack application that allows users to create posts, read other users' posts, comment on posts and revisit said posts due to data persistence and authenticated secure sessions.

## Table of Contents

- config
  - connection.js
- controllers
  - api
    - commentRoutes.js
    - index.js
    - postRoutes.js
    - userRoutes.js
- dashboardRoutes.js
- homeRoutes.js
- index.js
- db
  - schema.sql
- models
  - Comment.js
  - index.js
  - Post.js
  - User.js
- public
  - css
    - style.css
  - js
    - comment.js
    - dashboard.js
    - login.js
    - logout.js
    - signup.js
- seeds
  - comment-seeds.js
  - post-seeds.js
  - seed.js
  - user-seeds.js
- utils
  - auth.js
- views
  - layouts
    -main.handlebars
  - dashboard.handlebars
  - homepage.handlebars
  - login.handlebars
  - signup.handlebars
- env
- gitignore
- package-lock.json
- package.json
- server.js
- license
- README.md file

## Tasks

- WHEN I complete installation and seeding, I can run the server and view the homepage ('homepage.handlebars')
- WHEN I click LOGIN, I am directed to the login.handlebars view and provided the ability to login or create a new user SIGNUP
- WHEN I login using credentials that satisfy the credential criteria, I am directed to the dashboard.handlebars view, which shows the same view as homepage.handlebars but with CRUD operations for posts and comments
- WHEN I create a new POST, I see a new post with an EDIT and DELETE button for CRUD operations and a COMMENT hyperlink below
- WHEN I click the COMMENT hyperlink, a MODAL populates the screen that allows users to CREATE or DELETE comments created by the same USER
- WHEN I click the EDIT button on a selected POST, a MODAL populates the screen allowing me to EDIT existing text or to cancel the EDIT
- WHEN I click the DELETE button on a selected POST, the post is deleted

## Usage

Here is sample screenshots of various views
![sample dashboard](./images/Screenshot%202024-08-05%20at%206.30.42 PM.png)
![sample post edit](./images/Screenshot%202024-08-05%20at%206.31.59 PM.png)
![sample comments](./images/Screenshot%202024-08-05%20at%206.32.47 PM.png)

## Links

- Deployed Webpage: https://scurvyirv.github.io/debug-de-blog/
- GitHub Repo Page: https://github.com/scurvyirv/debug-de-blog

## Credits

- Postgres: https://www.npmjs.com/package/pg
- Bootstrap: https://www.npmjs.com/package/bootstrap
- Inquirer: https://www.npmjs.com/package/inquirer
- Node JS: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Sequelize: https://www.npmjs.com/package/sequelize
- Express: https://www.npmjs.com/package/express
- Connect Sessions Sequelize: https://www.npmjs.com/package/connect-session-sequelize
- Express Sessions: https://www.npmjs.com/package/express-session
- DotEnv: https://www.npmjs.com/package/dotenv
- bcrypt: https://www.npmjs.com/package/bcrypt
- Moment: https://www.npmjs.com/package/moment

## License

MIT License

Copyright (c) 2024 scurvyirv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
