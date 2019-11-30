# Admin/User REST Server (node.js)

> A basic initial setup for creating **REST Server**.

---

## Description

> A initial setup for writing a **REST** based admin/user server logic. Where admin can login and can create users. Normal User can just login when admin had already created them

---

## What is already done

- Basic npm packages needed for creating server has been included (check **package.json**).
- Different config files has been created for every environment. (Just make change to **.env** file for selecting different environment).
- User model has been created (inside **models** folder).
- Admin (can **login** and **create users**) and User (can **login**) routes and controller logic for both has been written.
- Password **encryption** and **JWT** token has been done using **bcrypt** and **jsonwebtoken** respectively (check **helper** folder).
- User **validation** and **JWT** token based request protection has been done (check **middlewares** folder)

> Note: Initially admin will be automatically created once you start the server using **npm start** with email: admin@admin.com and password: admin

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Setup](#setup)

## Requirements

- **mongodb** must be installed with mongo server running.
- **nodemon** must be installed globally on your machine.

## Installation

- Clone the repo.
- After cloning the repo

> install npm packages using

```shell
$ npm i
```

## Setup

- Change **project name** and **description** in **package.json** file
- Change your **Database Name** as per your project and **JWT Secret** inside config folder in **development.json** and **production.json**.
- Change admin login details as per your needs in **server.js**.

---

## Done.
