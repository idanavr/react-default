/* eslint-disable */
import userList from'./usersList';

// import assert from 'assert';
import { expect } from 'chai';
import jsdom from 'jsdom/lib/old-api';
import fs from 'fs';

describe('Main test', () => {
  it('should return -1 when the value is not present', () => {
    expect([1, 2, 3].indexOf(4)).to.equal(-1);
  });
});

// describe('index.html', () => {
//   it('should say hello', (done) => {
//     const index = fs.readFileSync('./index.html', 'utf-8');
//     jsdom.env(index, (err, window) => {
//       const h2 = window.document.getElementsByTagName('h2');
//       expect(h2.innerHTML).to.equals('Welcome');
//       done();
//       window.close();
//     })
//   });
// });