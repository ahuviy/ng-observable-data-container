const Store = require('./index').Store;

const instance = Store({ name: 'Jeff Wright' });

try {
    if (instance.value && instance.value.name === 'Jeff Wright') {
        console.log('PASSED: Store initialization');
    } else {
        throw 'FAILED';
    }
} catch (err) {
    console.warn('FAILED: Store initialization');
}

instance.publish(val => Object.assign({}, val, { name: 'Dean Harvey' }));

try {
    if (instance.value && instance.value.name === 'Dean Harvey') {
        console.log('PASSED: Store publish');
    } else {
        throw 'FAILED';
    }
} catch (err) {
    console.warn('FAILED: Store publish');
}
