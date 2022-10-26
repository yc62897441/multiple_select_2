const body = document.querySelector('body')
const select = document.querySelector('select')
const options = document.querySelectorAll('option')
const checkboxGroup = document.createElement("div")

options.forEach(option => {
  checkboxGroup.innerHTML += `<label style="display: block;"><input type="checkbox">${option.text}</label>`
  option.hidden = true
  option.selected = false
  option.disabled = true
})

// 建立新元素，當作 select 收合時的顯示選項
const headOption = document.createElement("option")
const defaultText = '請選擇選項'
headOption.text = defaultText
select.insertBefore(headOption, options[0])
headOption.selected = true
headOption.disabled = true

// 在 DOM 上插入 checkbox
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
insertAfter(checkboxGroup, select)
checkboxGroup.style.width = '120px'
checkboxGroup.style.display = 'none'

// 控制 checkbox 顯示/隱藏
let isShow = false
select.addEventListener('mousedown', function (event) {
  event.preventDefault()
  if (!isShow) {
    checkboxGroup.style.display = 'block'
    isShow = true
  } else {
    checkboxGroup.style.display = 'none'
    isShow = false
  }
})
checkboxGroup.addEventListener('mouseleave', function () {
  if (isShow) {
    checkboxGroup.style.display = 'none'
    isShow = false
  }
})

// 有被選取的選項
let optionsInHeadOption = []
checkboxGroup.addEventListener('input', function (event) {
  // 被選取選項的文字內容
  const inputOptionText = event.target.parentElement.textContent

  // 有被選取的選項，上底色；取消選取時，移除底色
  if (event.target.parentElement.style.backgroundColor === '') {
    event.target.parentElement.style.backgroundColor = '#999999'
  } else {
    event.target.parentElement.style.backgroundColor = ''
  }

  // 確認「被選取選項的文字內容」是否已經在 optionsInHeadOption 之中；如果是，則從 optionsInHeadOption 刪除該項；如果否，則把該項加入 optionsInHeadOption
  let isInOptionsInHeadOption = false
  const temp = []
  optionsInHeadOption.forEach(item => {
    if (item === inputOptionText) {
      isInOptionsInHeadOption = true
    } else if (item !== defaultText) {
      temp.push(item)
    }
  })
  if (isInOptionsInHeadOption) {
    optionsInHeadOption = temp
  } else {
    optionsInHeadOption.push(inputOptionText)
  }

  // 把 optionsInHeadOption 中的項目的文字套到 headOption；如果沒有任何項目，則套回 defaultText
  headOption.text = ''
  for (let i = 0; i < optionsInHeadOption.length; i++) {
    if (i === 0) {
      headOption.text = optionsInHeadOption[i]
    } else {
      headOption.text += `, ${optionsInHeadOption[i]}`
    }
  }
  if (headOption.text === '') {
    headOption.text = defaultText
  }
})
