// ==UserScript==
// @name         嘿嘿嘿嘿
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1.boss直聘 hr自动看简历
// @author       pithy
// @license      MIT
// @match        https://www.zhipin.com/*
// @grant        none
// ==/UserScript==

//config
let interval = 2000 //查看简历的间隔 单位ms
let delay = 1000 //看多久
//——————————————————————————


let running = false;
let list = []
let total = 0
let start = 0
const init = async () => {
  // window.scrollTo(0,Number.MAX_SAFE_INTEGER)
  // document.querySelectorAll('.btn-greet')

  //? init
  if (document.querySelector('.tools-btn2')) return
  console.warn('jobs tools start ');
  let el = document.createElement("button");
  el.setAttribute(
    "style",
    "width:80px;height:30px;border:0;cursor:pointer;outline: none;position: fixed; top: 40px; right: 10px;z-index:99999;font-size:16px"
  );
  el.setAttribute(
    'class',
    "tools-btn2"
  )
  el.innerText = "👀";
  document.querySelector("body").appendChild(el);
  el.addEventListener(
    "click",
    clickHandle,
    false
  )
}

const updateView = () => {
  const el = document.querySelector('.tools-btn2')
  el.innerHTML = "👀" + total
}

async function clickHandle() {
  const el = document.querySelector('.tools-btn2')
  running = !running
  el.style.background = running ? '#00bebd' : '#ffffff'
  task()
}
const loadNextPage = () => void window.scrollTo(0, Number.MAX_SAFE_INTEGER)

const sleep = (ms) => new Promise((res, _) => setTimeout(res, ms))
async function task() {
  if (!running) return
  console.warn('开始');
  list = document.querySelectorAll('.card-inner.blue-collar-wrap:not(.has-viewed)')
  console.log(list);
  for (let i = start; i < list.length; i++) {
    if (!running) {
      console.warn('暂停');
      start = i
      return
    }
    console.log(`${i + 1}/${list.length}`)
    total++
    list[i].click()
    //lasting
    await sleep(delay + Math.random() * 500)
    //关闭
    document.querySelector('.resume-custom-close').click()
    updateView()
    //interval
    await sleep(interval + Math.random() * 500)
  }
  //load more
  start = 0 //? 重置start
  console.warn('加载下一页');
  loadNextPage()
  await sleep(500)
  list = document.querySelectorAll('.card-inner.blue-collar-wrap:not(.has-viewed)')
  task()
}

