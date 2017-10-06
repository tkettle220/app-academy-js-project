# Cuboid

  Cuboid is a game played with the arrow keys in the browser. The basic goal of the game is to collect as many coins as possible while avoiding the spinning blades. The game is made interesting and challenging due to it taking place on the surface of a rotatable cube.

## Live Game and Demo
  Play the game [here](https://tkettle220.github.io/app-academy-js-project/)!

[![Demo CountPages alpha](https://j.gifs.com/Q0JgXM.gif)](https://www.youtube.com/watch?v=In4ky-LBBi0)

## Features and Technical Details

Below is a discussion of how Cuboid is built.  It uses vanilla JavaScript, jQuery, and plain CSS.

#### Displaying and Manipulating the Cube

The first task was to display a rotatable cube--This was done by applying simple css transformations to 6 divs, each representing a face of the cube. To rotate, we simply bind keys to apply different css transformations to a cube wrapper that contains these 6 face divs.

Unfortunately, we can only set a cube's rotation--we can't increment it with just css, and it's not super easy to get a cube's current rotation state. The easiest solution was to manually keep track of the cube's current rotation state by storing it as data in the jQuery object on initialization and updating it with every rotation.

We also make sure to use modular arithmetic, since setting the cube's X-Rotation from 405deg to 0deg would make it spin around once plus another quarter turn, rather than just the single quarter turn that's needed.

#### Moving the Player

Player movement is simple on one cube face. Each cube face contains 9 divs with class names corresponding to their x,y location on the face.  This means to display and move the player all we need to do is keep track of a player's current face and x,y position, updating both to move.  

To handle wrapping, when a new position is calculated, if the x or y coordinate is outside of the face, we first assess what direction the player is trying to go.  For instance, a negative x indicates the player has wrapped to the left of the current face.  To find the new face, we just store these relationships in a hash and convert old faces to new faces based on direction by doing an easy hash lookup.

`{left-face: {left: 'back', right: 'front', top: 'top', bottom: 'bottom'},
  front-face: etc.}`

To find the new position, if we're moving left-right on the front, left, right, or back of the cube, we can just get the new position by doing modular arithmetic: pretty easy! Moving into or out of the top or bottom face is harder though, since the formula for the new position depends on where we're leaving the face from, so we take care to handle those cases separately.

#### Moving the Player: Extras

The above worked pretty well, but it was super unintuitive when a player moved to the top or bottom face.  There was a constant 'up' direction on the top face which meant that rotating the cube to the back face would result in the up key corresponding to a downward movement if on the top face. It made the game really hard to play, so we needed to have motion associated with the player movement keys depend on the rotation of the cube.



#### Moving Enemies

Enemies have a direction, such as [0,1] (constantly move to the right), which calculates their new position when moving by adding that vector to their current position. We need to handle crossing into and out of the top and bottom face once again, since a velocity of moving up on the left face into the top face is continued by moving right across the top face.

## Architecture and Technologies

  Vanilla JavaScript for overall structure and game logic
  HTML5 Canvas for DOM manipulation and rendering
  Webpack to bundle and serve up the various scripts.

Scripts involved in this project:

  * board.js: logic for creating and updating the necessary DOM elements

  * enemies.js: logic for enemy type, movement, and collision

  * player.js: logic for player, movement, and collision

  * cube.js: logic for rotating the cube and player input

  * coin.js: logic for coin spawn and collecting

  * game.js: logic for updating level and keeping track of score
