const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeFormat = date => {
  const hour = date.getHours();
  if (hour < 6) {
    return '凌晨了';
  } else if (hour < 9) {
    return '早上好';
  } else if (hour < 12) {
    return '上午好';
  } else if (hour < 14){
    return '中午好';
  } else if (hour < 17) {
    return '下午好';
  } else if (hour < 19) {
    return '傍晚好';
  } else if (hour < 22) {
    return '晚上好';
  } else {
    return '深夜了';
  }
};

function login() {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject })
  })
}

module.exports = {
  formatTime: formatTime,
  timeFormat: timeFormat,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
}
