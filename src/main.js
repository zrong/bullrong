import '@/style.scss'

import Prism from '@/vendor/prism.js'

/**
 * 提供对 AID 的调用
 * @param {string} rid 
 * @param {string} infoURL 
 * @param {string} goURL 
 */
function download (rid, infoURL, goURL) {
  // TODO 此处换用 axios
  // TODO 取消对 jQuery 的依赖
  $.getJSON(infoURL, function (data) {
    if (data.error) {
      $(rid).text(data.message)
      $(rid).addClass('bg-danger')
    }
    else {
      $(rid).empty()
      $(rid).addClass('bg-info')
      let f = data.file
      var ul = $('<ul>')
      ul.append($('<li>').text(f.file_name))
      ul.append($('<li>').text(f.file_date))
      ul.append($('<li>').text(f.file_hits))
      if (f.file_des) {
        ul.append($('<li>').text(data.file_des))
      }
      // TODO file的值可能是相对路径，需要判断
      let file = null
      if (f.file.indexOf('http') === 0) {
        file = f.file
      }
      else {
        file = goURL
      }
      var a = '<a href="' + file + '" target="_blank">下载文件</a>'
      ul.append($('<li>').html(a))
      $(rid).append(ul)
    }
  })
}

function initDownloads () {
  // TODO 查找所有符合条件的 dl 容器，为其中的 btn 加入 click 事件
  // 以下部分为伪代码
  if (AID_DL_INFO_URL === undefined || AID_DL_GO_URL === undefined) {
    return
  }
  const AID_DL_LIST = document.querySelectorAll('#aid-dl-div-*')
  if (AID_DL_LIST) {
    for (const dlDiv of AID_DL_LIST) {
      // id is a number
      let btn = dlDiv.button
      btn.addEventListener('click', (evt) => {
        const id = evt.currentTarget.id
        const rid = '#aid-dl-div-' + id
        const infoURL = AID_DL_INFO_URL.replace('%s', id)
        const goURL = AID_DL_GO_URL.replace('%s', id)
        download(rid, infoURL, goURL)
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  initDownloads()
})
