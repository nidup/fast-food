# Fast Food

Small explosive zombie game rushly developed #uglyCodeAndBugsInside with Phaser JS for the Akeneo Game Jam #1.

![Image of GameJam](doc/game-jam-1.png)

![Image of FastFood](doc/fast-food.png)

# Demo

You can access to the demo here https://nidup.github.io/fast-food/

Notice that it takes some time to boot, it downloads the whole internet.

# Development

## Pre-requisites

You need to have `docker` installed

## Run the dev image

Run to mount local project code inside the container and bind ports
```
docker run --name phaser -v "$PWD":/usr/src/app -p 8080:8080 -d nidup/phaser:latest
```

## Install / update project dependencies

```
docker exec -it phaser npm install
```

## Launch webpack server in watch mode:

```
docker exec -it phaser npm run dev
```

## Test in brower

Access to http://localhost:8080

## Build to deploy static files

```
docker exec -it phaser npm run build
```

# Artwork and special thanks

Thx @grena for the Game Jam org!

Thx @belohlavek for the following boilerplate https://github.com/belohlavek/phaser-es6-boilerplate

Thx phaser for tile sprites and explosion audio http://phaser.io/examples/v2/games/invaders

Thx Curt for the Zombie Artwork http://opengameart.org/content/zombie-rpg-sprites

Thx rswhite for the explosion sprite http://rswhite.de/dgame5/?page=tutorial&tut=spritesheets

Thx K. Macleod for the audio http://incompetech.com/

Thx netgfx for the audio https://github.com/netgfx/Phaser-typewriter

Thx bart for the audio http://opengameart.org/content/25-spooky-sound-effects

Thx Russintheus for the audio http://www.freesound.org/people/Russintheus/sounds/165089/#

