writeCode

Q. write express generator command with varying options to generate express app with following features:


- isntall Express-Generator globally
> npm install -g express-generator

- using ejs as template engine
> express --view ejs `APP_NAME`

- no views for express application
> express --view no-view `APP_NAME`

- express app with gitignore
> express --git `APP_NAME`

- express app with sass support for styling.
> express --css scss `APP_NAME`

- ejs as template engine and sass for styling
> express --views ejs --css scss `APP_NAME`

- pug as template engine and gitignore together
> express --views pug --git `APP_NAME`
