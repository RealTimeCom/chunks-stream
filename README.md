## Chunks Stream - split stream data into HTTP chunks

**Transform data stream into http chunks**

```sh
$ npm install chunks-stream
```
#### Example
Send 10 bytes of http chunks
```js
const chunks = require('chunks-stream');

require('fs').createReadStream('/dir/file.txt'). // readable stream
pipe(new chunks(10)). // 10 bytes each chunk
on('data', data => console.log('data', data.toString())); // output data
```
--------------------------------------------------------
**Chunks Stream** is licensed under the MIT license. See the included `LICENSE` file for more details.
