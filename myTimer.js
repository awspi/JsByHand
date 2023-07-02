function myTimer(fn, a, b) {
  let count = 0
  let delay = a
  const timer = setInterval(() => {
    fn()
    count++
    delay = a + b * count
  }, delay)
  return () => clearInterval(timer)
}

const fn = () => console.log('hello world')

const clear = myTimer(fn, 1000, 1000)
