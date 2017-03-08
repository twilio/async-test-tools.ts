import * as _Async from 'async';

class Async {
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

  /**
   * Waits for given event on EventEmitter
   * @param {EventEmitter} emitter Instance of EventEmitter-compatible entity
   * @param {string} eventName Name of event to wait
   * @param {function} [condition] Event is being ignored if condition passed and returns false
   * @returns {Promise<void>}
   */
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

  /**
   * Gives control to the event loop for one tick
   * Useful to execute some asynchronous events in test
   */
  static async tick() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 0);
    });
  }
}

export default Async;
export { Async };

