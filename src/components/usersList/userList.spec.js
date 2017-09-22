// import React from 'react';
import userList from'./usersList.js';

import assert from 'assert';

describe('Main test', () => {
  it('should return -1 when the value is not present', () => {
    assert.equal(-1, [1, 2, 3].indexOf(4));
  });
  //   });

  it('should fail', (err) => {
    userList.
    assert.fail(`Not test anything yet ${err}`); // doesn't work well
  })

})