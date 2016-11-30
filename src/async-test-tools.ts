import * as Async from 'async';

export default class EnsuredAsync {
  static sequence(steps : Function[], verify?: Function, done?: Function) {
    return new Promise(function(resolve, reject) {
      let wrappedSteps = steps.map((f:any) => Async.ensureAsync((next:any) => {
        f();
        next();
      }) as AsyncFunction<any, any>);

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

