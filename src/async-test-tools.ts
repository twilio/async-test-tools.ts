import * as _Async from 'async';

export class Async {
  static sequence(steps : Function[], verify?: Function, done?: Function) {
    return new Promise(function(resolve, reject) {
      let wrappedSteps = steps.map((f:any) => _Async.ensureAsync((next:any) => {
        f();
        next();
      }) as AsyncFunction<any, any>);

      return _Async.series(wrappedSteps, () => {
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

