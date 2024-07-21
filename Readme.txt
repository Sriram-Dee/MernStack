====================== Backend folder:
npm init -y
npm i express
npm i nodemon -D // -D for developer dependency
    Change package.json:
      "type": "module",
        "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js"
        },
npm i dotenv
npm i mongoose // to use MongoDB inbuild fuctions
npm i bcryptjs // to enrypt user password
npm i jsonwebtoken 
npm i nodemailer // to send mails to user


---------------------------------------------------------
#Models         -> Database collection
#View           -> Web page response
#Controller     -> Client -> Backend