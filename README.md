<div align="center">

# uso!mania

[![Netlify Status](https://api.netlify.com/api/v1/badges/635bea7d-9ac4-4ddf-a718-6b96e40d06a4/deploy-status)](https://app.netlify.com/sites/uso-mania/deploys)

[Front-End Repository](https://github.com/wilsonw13/uso-mania-frontend) • [Back-End Repository](https://github.com/wilsonw13/uso-mania-backend) • [Hosted Link](https://uso-mania.netlify.app/)

</div>

## About

uso!mania is a full-stack web application rhythm game similar to that of the [Guitar Hero series](https://en.wikipedia.org/wiki/Guitar_Hero), [Piano Tiles](https://en.wikipedia.org/wiki/Piano_Tiles), and of course [osu!mania](https://osu.ppy.sh/home) itself, the game in which we primarily drew our inspiration from. 

The front-end is built on the NuxtJS framework using PixiJS as our graphics engine and is hosted on Netlify.

The back-end is an ExpressJS server connected to a MongoDB Atlas database hosted on Render. We have future plans to swap to Python Flask server connected to a MySQL database with Prisma.

## Local Installation

### Install front-end NuxtJS server:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [NuxtJS documentation](https://nuxtjs.org).

### Install back-end ExpressJS server:

Create `.env` file with the following variables:

```
DATABASE='<YOUR_DATABASE_URL_HERE>'
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8000
$ npm run dev

# serve statically
$ npm run start
```

## Libraries/Frameworks Used

* [Auth0](https://auth0.com/): authentication service
* [Express](https://expressjs.com/): back-end server
* [Fort Awesome](https://fortawesome.com/): icons
* [Howler](https://howlerjs.com/): JavaScript sound library
* [MongoDB Atlas](https://www.mongodb.com/atlas/database): document database service
* [Nuxt 2](https://nuxtjs.org/): front-end framework
* [Pixi](https://pixijs.com/): JavaScript graphics library

## Authors

[Wilson W](https://github.com/wilsonw13): Project Lead and Front-end Developer

[Harvey J](https://github.com/harveyj123): Front-end and Back-end Developer

[Kenny T](https://github.com/kentng01): Front-end Developer

[Ethan L](https://github.com/ethanl66): Front-end Developer

[Ryan S](https://github.com/ryan-sliger): Back-end Developer

## Contributing

You are more than welcome to fork our repository to continue expanding this project since we have mostly stopped development.

## License

The code to uso!mania is licensed under the [MIT License](LICENCE).