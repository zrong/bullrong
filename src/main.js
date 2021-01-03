import '@/style.scss'

import Prism from '@/vendor/prism.js'
import axios from 'axios'

/**
 * 提供对 AID 的调用
 * @param {string} rid 
 * @param {string} infoURL 
 * @param {string} goURL 
 */
function download (rid, infoURL, goURL) {
  const dldiv = document.getElementById(rid)
  if (!dldiv) {
    return
  }
  axios.get(infoURL).then((resp) => {
    dldiv.empty()
    dldiv.addClass('bg-info')
    const f = resp.file
    const ul = document.createElement('ul')
    for (const text of [f.file_name, f.file_date, f.file_hits, f.file_des]) {
      if (text) {
        const li = document.createElement('li')
        li.innerText = text
        ul.appendChild(li)
      }
    }
    // TODO file的值可能是相对路径，需要判断
    let file = null
    if (f.file.indexOf('http') === 0) {
      file = f.file
    } else {
      file = goURL
    }
    const lia = document.createElement('li')
    lia.innerHTML = `<a href="${file}" target="_blank">下载文件</a>`
    ul.appendChild(lia)
    dldiv.appendChild(ul)
  }).catch((error) => {
    dldiv.text(error.message)
    dldiv.addClass('bg-danger')
  })
}

function initDownloads () {
  // TODO 查找所有符合条件的 dl 容器，为其中的 btn 加入 click 事件
  // 以下部分为伪代码
  if (typeof AID_DL_INFO_URL === 'undefined' || typeof AID_DL_GO_URL === 'undefined') {
    console.error(`AID_DL_INFO_URL or AID_DL_GO_URL is not defined`)
    return
  }
  const AID_DL_LIST = document.querySelectorAll('#aid-dl-div-*')
  if (AID_DL_LIST) {
    for (const dldiv of AID_DL_LIST) {
      // id is a number
      let btn = dldiv.button
      btn.addEventListener('click', (evt) => {
        const id = evt.currentTarget.id
        const rid = `#aid-dl-div-${id}`
        // eslint-disable-next-line no-undef
        const infoURL = AID_DL_INFO_URL.replace('%s', id)
        // eslint-disable-next-line no-undef
        const goURL = AID_DL_GO_URL.replace('%s', id)
        download(rid, infoURL, goURL)
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  initDownloads()
})
