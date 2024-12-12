/* eslint-disable import/no-named-as-default */
import dbClient from '../../utils/db';

describe('+ UserController', () => {
  const mockUser = {
    email: 'beloxxi@blues.com',
    password: 'melody1982',
  };

  before(function (done) {
    this.timeout(10000);
    dbClient.usersCollection()
      .then((usersCollection) => {
        usersCollection.deleteMany({ email: mockUser.email })
          .then(() => done())
          .catch((deleteErr) => done(deleteErr));
      }).catch((connectErr) => done(connectErr));
    setTimeout(done, 5000);
  });


