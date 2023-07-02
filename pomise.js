class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.status === 'rejected') {
      onRejected(this.reason);
    }
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
      resolve('Promise resolved successfully!');
    } else {
      reject('Promise rejected!');
    }
  }, 2000);
});

myPromise.then(
  (value) => {
    console.log('Fulfilled:', value);
  },
  (reason) => {
    console.log('Rejected:', reason);
  }
);
