## Chunks Stream

**Transform data stream into http chunks**

```sh
$ npm install chunks-stream
```
#### Example
Send 10 bytes of http chunks
```js
const chunks = require('chunks-stream'), fs = require('fs');

fs.createReadStream('/dir/file.txt').// readable stream
pipe(new chunks(10)).// 10 bytes each chunk
on('data', d => console.log('data', d.toString()));// output data
```
--------------------------------------------------------
**Chunks Stream** is licensed under the MIT license. See the included `LICENSE` file for more details.
