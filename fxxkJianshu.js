const fn = () => {
  const firstLevelElements = document.body.children;

  // 遍历第一层元素
  for (let i = 0; i < firstLevelElements.length; i++) {
    const firstLevelElement = firstLevelElements[i];

    // 获取元素的z-index值
    const zIndex = window.getComputedStyle(firstLevelElement).getPropertyValue('z-index');

    if (parseInt(zIndex) > 100000) {
      firstLevelElement.parentNode.removeChild(firstLevelElement);
      i--; // 保持索引正确，因为元素已被移除
    } else {
      // 获取第二层元素
      const secondLevelElements = firstLevelElement.children;

      // 遍历第二层元素
      for (let j = 0; j < secondLevelElements.length; j++) {
        const secondLevelElement = secondLevelElements[j];

        // 获取元素的z-index值
        const zIndex = window.getComputedStyle(secondLevelElement).getPropertyValue('z-index');

        if (parseInt(zIndex) > 100000) {
          secondLevelElement.parentNode.removeChild(secondLevelElement);
          j--; // 保持索引正确，因为元素已被移除
        }
      }
    }
  }

}
window.on = fn
