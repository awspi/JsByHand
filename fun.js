const delay = () => new Promise((res, _) => setTimeout(res, 1000))

const loop = async () => {
  await delay()
  console.log('🍔');
  await delay(100)
  console.log('🍟');
  loop()
}
loop()
