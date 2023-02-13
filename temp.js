const pLimit = (concurrency) => {
  const queue = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.length > 0) {
      queue.shift()();
    }
  };

  const run = async (fn, resolve, ...args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch { }

    next();
  };

  const enqueue = (fn, resolve, ...args) => {
    queue.push(run.bind(null, fn, resolve, ...args));

    if (activeCount < concurrency && queue.length > 0) {
      queue.shift()();
    }
  };

  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, ...args);
    });

  return generator;
};
