# Cuboid

  Cuboid is a game played with the arrow keys in the browser. The basic goal of the game is to collect as many coins as possible while avoiding the spinning blades. The game is made interesting and challenging due to it taking place on the surface of a rotatable cube.

## Live Game and Demo
  Play the game [here](https://tkettle220.github.io/app-academy-js-project/)!


#### Starting the game
![Game Start Gif](https://j.gifs.com/W7ODEW.gif)

#### Level Transitions and Death
![Level Transition Gif](https://j.gifs.com/RoYxmL.gif)

#### Harder Levels
![Harder Levels Gif](https://j.gifs.com/wm9BzJ.gif)

## 3D Technical Details

Below is a discussion of how the 3D challenges involved in Cuboid were handled. Only vanilla JavaScript, jQuery, and CSS were used.

#### Displaying and Manipulating the Cube

The first task was to display a rotatable cube--This was done by applying simple css transformations to 6 divs, each representing a face of the cube. To rotate, we simply bind keys to apply different css transformations to a cube wrapper that contains these 6 face divs.

Unfortunately, we can only set a cube's rotation--we can't increment it with just CSS, and it's not super easy to get a cube's current rotation state. The easiest solution was to manually keep track of the cube's current rotation state by storing it as data in the jQuery object on initialization and updating it with every rotation.

We also make sure to use modular arithmetic, since setting the cube's X-Rotation from 405deg to 0deg would make it spin around once plus another quarter turn, rather than just the single quarter turn that's needed.

#### Moving the Player

Player movement is simple on one cube face. Each cube face contains 9 divs with class names corresponding to their x,y location on the face.  This means to display and move the player all we need to do is keep track of a player's current face and x,y position, updating both to move.  

To handle wrapping to a new face, when a new position is calculated, if the x or y coordinate is outside of the face, we first assess what direction the player is trying to go.  For instance, a negative x indicates the player has wrapped to the left of the current face.  To find the new face, we just store these relationships in a hash and convert old faces to new faces based on direction by doing an easy hash lookup.

`{left-face: {left: 'back', right: 'front', top: 'top', bottom: 'bottom'},
  front-face: etc.}`

To find the new position, if we're moving left-right on the front, left, right, or back of the cube, we can just get the new position by doing modular arithmetic: pretty easy! Moving into or out of the top or bottom face is harder though, since the formula for the new position depends on where we're leaving the face from, so we take care to handle those cases separately.

#### Moving the Player: Extras

The above worked pretty well, but it was super unintuitive when a player moved to the top or bottom face.  There was a constant 'up' direction on the top face which meant that rotating the cube to the back face would result in the up key corresponding to a downward movement if on the top face. It made the game really hard to play, so I wanted to make player movement depend on the rotation of the cube.

In the below code, we see that if the player is not on the top or bottom face, player movement is super simple--just move a player one column to the left.  However, if they're on the top or bottom face, what happens?  Well I already had a function to convert cube rotation to a whole number to represent what face was showing--0 for front, 1 for left, 2 for back, 3 for right. To relate the rotation of the cube to move direction, I keep an array of move directions in an order corresponding to the order I would rotate the directions depending on what face I'm on. Now, I can just set key inputs based on getting a particular index in the array of directions offset by the face I'm on.  For the bottom face, this face offset will just go through the array backwards to represent an opposite rotation.  

For ex: If I have rotated to the back face, the face offset will be 2. The left arrow will correspond to whatever direction is 2 'in front' of it in the array, which is the starting right direction.

```js

//up, right, down, left
const DIRECTION_ROTATIONS = [[-1,0],[0,1],[1,0],[0,-1]];

static bindMoveKeys(player, cube) {

  key("left", function(){
    if(["top","bottom"].includes(player.face)) {
      let face = Util.getFace(cube.data('h-rot'));
      if(player.face == "bottom") {
        face = -face;
      }
      player.move(DIRECTION_ROTATIONS[Util.mod((face + 3),4)]);
    } else {
      player.move([0,-1]);
    }
  });
```


#### Moving Enemies

Enemies have a direction, such as [0,1] (constantly move to the right), which calculates their new position when moving by adding that vector to their current position. We need to handle crossing into and out of the top and bottom face, since a velocity of moving up on the left face into the top face is continued by moving right across the top face.
