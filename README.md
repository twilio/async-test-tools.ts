Async test tools
===

Sometimes for testing asynchronous code it's needed to run an event loop, to make promise.then method run, etc.
With this library test with timeouts and async code would look like follows

```
it('Does what we want', () => {
  return Async.sequence([
    () => { // make a first step here },
    () => { // make a second step here },
  ],
  () => {
    // All final checks, asserts and expects here
  });
});


