import * as Async from 'async';

export default class EnsuredAsync {
  static sequence(steps, verify, done) {
    return new Promise(function(resolve, reject) {
      let wrappedSteps = steps.map(f => Async.ensureAsync(next => {
        f();
        next();
      }));

      return Async.series(wrappedSteps, () => {
        try {
          if (verify) { verify(); }
          if (done) { done(); }
          resolve()
        } catch(e) {
          if (done) { done(e); }
          reject(e);
        }
      });
    });
  }
}

