#### impactConnect ####
this is my implementation of a impact plugin for realtime multiplayer games with node/socket.io

### requirements ###
1. nodejs and socket.io
for windows user i highly recommend nodejs-win (http://code.google.com/p/nodejs-win/) until npm works without massive pain.
2. a normal webserver like apache (xampp, wampp... etc)
3. the impact game engine (http://impactjs.com/)

### demo ###
http://www.youtube.com/watch?v=4-ib0qJsyrE

to run the demo, just put a copy of impact in the lib folder and start the server ("node impactConnectServer.js")
in case of several security restrictions, you have to start a webserver and open the index.html via http://localhost/impactConnect/


### short infos and explanations ###
- socket.io removes all prototypes from classes and objects for no reason (or i just dont know the reason), so im sending strings and use eval on client side (in spawning entities and moving function).
example for moving animation:
var newAnim = "ent.anims."+data.remoteAnim;
ent.currentAnim = eval(newAnim);

- reconnecting does not work for now

- extended main.js by "getEntityByRemoteId"

- if you want to run it not on localhost, you have to change the server in 2 files:
index.html:
<script type="text/javascript" src="http://localhost:1337/socket.io/socket.io.js"></script>
impactconnect.js:
this.socket = io.connect('http://localhost:'+port, {...

- if you need more logging serverside, just uncomment "io.set('log level', 1);" in impactConnectServer.js




