# Node.js + MongoDB + Vue.js + Vuestic

This repo contains an example of the use of Node.js, MongoDB, Vue.js and Vuestic. Auths come from Passport.js using a token. There's some other cool stuffs, and some ugly ones.

## Getting started

```
git clone https://github.com/DiegoPires/node-mongo-vue-vuestic-dashboard-template.git
cd node-mongo-vue-vuestic-dashboard-template
```

To compile backend:

```
cd src/backend
npm run dev
```

backend will be served in: http://localhost:8081/

To compile frontend:
```
cd src/frontend
npm run dev
```

frontend will be served in http://localhost:8080/

At first a user will be created as:
e-mail: asd@asd.com
password: asd

## Mongo
There's an exemple file to the initial import with mongoimport in /Data/example_import.txt: 

```
cd node-mongo-vue-vuestic-dashboard-template/Data
mongoimport --db sales --collection sales --file exemple_import.txt --jsonArray
```

Otherwise can run the seed, 10000 fake data will be created:
```
cd node-mongo-vue-vuestic-dashboard-template
npm run seed
```

The file /Data/migration/mongomigration.js has some stuffs to be done before using the system

## Git quickguide

`git checkout develop` -> change to checkout bragitnch

`git checkout master` -> change to master branch

`git pull` -> get all changes from the server

`git add .` -> add all local changes

`git commit -m "message"` -> commit changes with a message

`git push origin develop` -> send all committed changes to the develop branch

Develop everything first on the develop branch

## Resources
- [MEVN stack tutorial](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0)

- [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)

- [Template based](https://startbootstrap.com/template-overviews/sb-admin/)

## Inspiration taken from 
- [Hobbies repo](https://github.com/iurii-kyrylenko/hobbies)