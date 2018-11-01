var BehaviorSubject = require('rxjs').BehaviorSubject;

exports.DataContainer = function (initialState) {
  var internalSubject = new BehaviorSubject(initialState);

  return {
    stream: internalSubject.asObservable(),
    get value() {
      return internalSubject.getValue();
    },
    publish: function (transformer) {
      var newValue = transformer
        ? transformer(internalSubject.getValue())
        : internalSubject.getValue();
      internalSubject.next(newValue);
    },
    toReadonly: function () {
      return {
        stream: internalSubject.asObservable(),
        get value() { return internalSubject.getValue(); }
      };
    },
  };
}
