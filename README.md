<h2> Tooling: </h2>
<p>Although GitHub lists this as a JavaScript project all the code was written in TypeScript</p>
<p>To get bundle.js I transpiled my .ts files to .js files, and then bundled together using browserify</p>
<p>I used simple npm scripts for compilation, but apart from that this project has no dependencies</p>

<h2> Controls: </h2>
<p>The keyboard arrows map onto movements (i.e left key arrow moves the tetrimino left etc)</p>
<p>The up keyboard arrow rotates the current tetrimino</p>
<p>The 'h' key lets you hold tetriminos</p>
<p>Currently the game doesn't have phone controls, but the page is built to display well on phones so you can still watch the AI do its thing</p>

<h2>TODO:</h2>
<p>Add screen controls for mobile users</p>
<p>Add help modal for controls</p>
<p>Allow AI to hold pieces</p>