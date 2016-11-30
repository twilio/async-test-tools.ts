import 'mocha';
import Async from '../src/async-test-tools';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Async seqence', () => {

  it('marks test as passed when no exceptions has been thrown', () => {
    let a = 0;
    return Async.sequence([
      () => a++,
      () => a++
    ]).should.be.fulfilled;
  });

  it('marks test as failed when exception has been thrown', () => {
    return Async.sequence([
        () => { throw new Error('Something wrong!') }
    ]).should.be.rejected;
  });

  it('marks tests as passed when "verify" callback is happy', () => {
    let a = 0;
    return Async.sequence([
      () => { a++; }
    ],
    () => {
      expect(a).to.equal(1);
    }).should.be.fulfilled;
  });

  it('marks tests as rejected when "verify" callback throws', () => {
    let a = 0;
    return Async.sequence([
      () => { a++; }
    ],
    () => {
      expect(a).to.equal(666);
    }).should.be.rejected;
  });

  it('Also works with "done" callback', (done) => {
    Async.sequence([], () => {}, done);
  });

});

