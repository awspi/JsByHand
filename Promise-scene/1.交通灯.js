
const yellow = () => console.log('yellow');
const green = () => console.log('green');
const red = () => console.log('red');

const task = (timer, light) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })
}

const taskRunner = async () => {
  await task(3000, 'red')
  await task(1000, 'green')
  await task(2000, 'yellow')
  taskRunner()
}

taskRunner()
