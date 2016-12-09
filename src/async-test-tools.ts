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

  static waitForEvent(emitter : any, eventName : string, condition? : Function) {
    return new Promise((resolve, reject) => {
      function handler() {
        if (condition && !condition.apply(null, arguments)) { return; }
        emitter.removeListener(eventName, handler);
        let args = Array.prototype.slice.call(arguments);
        resolve(args);
      }

      emitter.on(eventName, handler);
    });
  }
}

