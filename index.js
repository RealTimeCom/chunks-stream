/* SOURCE FILE - Copyright (c) 2017 chunks-stream - Tanase Laurentiu Iulian - https://github.com/RealTimeCom/chunks-stream */
'use strict';

const Transform = require('stream').Transform;

class chunks extends Transform {
    constructor(b) {
        super({
            highWaterMark: b
        });
        this.b = b;
        this.g = Buffer.from(b.toString(16)); // convert chunk size into hex number
        this.z = Buffer.allocUnsafeSlow(0); // create an un-pooled empty buffer
        this.c = this.z; // init empty cache buffer
        this.n = Buffer.from('\r\n'); // new line
        this.e = Buffer.from('0\r\n\r\n'); // end bytes
    }
}
chunks.prototype._transform = function(chunk, enc, cb) {
    this.c = Buffer.concat([this.c, chunk]); // append chunk to cache
    let l = this.c.length;
    if (l > this.b) {
        for (let y, i = 0; i <= l; i += this.b) { // for each chunk, notice: i<=l to cut empty buffer remain
            if (l < i + this.b) {
                this.c = this.c.slice(i, l); // cache remaining bytes
            } else {
                this.push(Buffer.concat([this.g, this.n, this.c.slice(i, i + this.b), this.n]));
            }
        }
    }
    cb();
};
chunks.prototype._flush = function(cb) { // send remaining cache + end bytes
    let l = this.c.length;
    if (l > 0) {
        this.push(Buffer.concat([Buffer.from(l.toString(16)), this.n, this.c, this.n, this.e]));
    } else {
        this.push(this.e);
    }
    cb();
};

module.exports = chunks;
