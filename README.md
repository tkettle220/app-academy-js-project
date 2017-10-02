# Cuboid

  Cuboid is a game played with the arrow keys in the browser. The basic goal of the game is to collect as many coins as possible while avoiding enemy dots. The gamespace is represented by the surface of a rotatable cube. 
  
## Inspiration and Demo
  This game is inspired by the following 2d game called Smove:
  https://www.youtube.com/watch?v=In4ky-LBBi0
  
[![Demo CountPages alpha](https://j.gifs.com/Q0JgXM.gif)](https://www.youtube.com/watch?v=In4ky-LBBi0)

  Cuboid will be very similar, except rather than taking place on a 3x3 grid, it will take place on a cube's surface, with each surface consisting of a 3x3 grid. All enemies will spawn at the level's beginning, and never die--they will simply cycle around the cube based on their pattern.  A player can move across the cube's surface with the arrow keys and rotate the cube with a secondary set of functional arrow keys, WASD. 
  
## Functionality & MVP

  1. The map must be a cube (3x3x3 initially) which players can traverse
  2. The player and cube movements should be smooth and visually appealing
  3. Enemies must traverse the cube according to different patterns based on the level
  4. Player and enemy collisions should result in a game over
  4. Level should increment every 10 coins collected
  5. A user's score should be displayed and updated during the game and at the game over screen
  

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

## Implementation Timeline

Weekend:
 Create a single 3x3 grid which a player can move on
 
Monday: 
  Get webpack serving files and frame out index.html
  Learn about creating 3d cube
  Render a 3d cube with 3x3 grids on its surface which can be rotated with the arrow keys
  
Tuesday:
  Render the cube with a player on it
  Allow the player to move about the cube
  
Wednesday:
  Create random coins which spawn on the cube and can be collected
  Create leveling system and score tracking for coins
  Add a pretty background and soundtrack
  
Thursday:
  Implement enemy spawn, movement, and logic
  Add all the game logic and screens (instructions, start game, game over, etc.)
  
Friday:
  Write many levels, do bonuses as time permits
  
## Bonus features
  * A toggle feature which, when active, will auto rotate the cube to the surface the player moves to
  * Levels with different cuboid dimensions
  * Complicated enemy movements: diagonals, enemies which cannot traverse surfaces (they bounce off of edges), enemies which move in steps rather than smoothly, enemies which move with non-constant velocity, etc.
  * Cube rotation which moves smoothly rather than in steps
  * A mini-screen on the side which always shows the face of the cube which the player is currently on
  * A pretty background which changes based on level
