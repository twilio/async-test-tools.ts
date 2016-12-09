import 'mocha';
import { Async } from '../src/async-test-tools';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { EventEmitter } from 'events';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Async test tools', function() {
  describe('waitForEvent', function() {
    it('Resolves on any event arguments when no condition passed', () => {
      let emitter = new EventEmitter();

      setTimeout(() => emitter.emit('testEvent'), 0);
      return Async.waitForEvent(emitter, 'testEvent');
    });

    it('Resolves only on arguments which are passing through condition', async () => {
      let emitter = new EventEmitter();

      setTimeout(() => emitter.emit('testEvent', 'a'), 0);
      setTimeout(() => emitter.emit('testEvent', 'b'), 1);
      setTimeout(() => emitter.emit('testEvent', 'test-string'), 2);
      return Async.waitForEvent(emitter, 'testEvent', x => x === 'test-string')
        .then(x => { expect(x[0]).to.equal('test-string'); });
    });

  });
});

