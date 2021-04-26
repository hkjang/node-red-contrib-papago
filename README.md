node-red-contrib-papago
================

Node-RED node for papago



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-papago, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-papago

## Wrapper naver papago  API  
- https://developers.naver.com/docs/nmt/reference/
- https://developers.naver.com/docs/papago/papago-nmt-api-reference.md

## Sample parameters
```js

msg.params = {};
msg.params.text = 'test'; //#검색어
msg.params.source = "en" // # source language code
msg.params.target = 'ko' //# target language code

return msg;

```
## Sample flows
```json
[{"id":"495eb222.ad195c","type":"papago","z":"fbe560b0.5c19f","name":"naver papago","text":"test","source":"en","target":"ko","creds":"ab9c76d2.e12a18","x":460,"y":200,"wires":[["ad830173.e91b8"]]},{"id":"34af5463.5dc3ac","type":"inject","z":"fbe560b0.5c19f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":200,"wires":[["fb30a421.758b48"]]},{"id":"ad830173.e91b8","type":"debug","z":"fbe560b0.5c19f","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":670,"y":200,"wires":[]},{"id":"fb30a421.758b48","type":"function","z":"fbe560b0.5c19f","name":"","func":"msg.params = {};\n// msg.text = 'nice';\n// msg.source = 'en'\n// msg.target = 'ko'\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":280,"y":200,"wires":[["495eb222.ad195c"]]},{"id":"ab9c76d2.e12a18","type":"naverPapagoApiKey","name":""}]
```
