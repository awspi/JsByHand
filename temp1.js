function tar(n) {
  for (let i = 0; i < n; i++) {
    let str1 = ' '
    let str2 = str1.repeat(n - i)
    let str3 = '*'
    let str4 = str3.repeat(2 * (i + 1) - 1)
    console.log(str2 + str4)
  }
}
tar(11)
