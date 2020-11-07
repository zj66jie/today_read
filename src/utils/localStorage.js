import Storage from "web-storage-cache";

const localStorage = new Storage();

//得到缓存的值存储
export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}
//通过key获取某个值
export function getLocalStorage(key) {
  return localStorage.get(key);
}
//清楚某个缓存
export function removeLocalStorage(key) {
  return localStorage.delete(key);
}
//清空缓存
export function clearLocalStorage() {
  return localStorage.clear();
}

//存储获取字体大小
export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, "fontSize", fontSize);
}
export function getFontSize(fileName) {
  return getBookObject(fileName, "fontSize");
}
//字体存储和获取
export function saveFontFamily(fileName, fontFamily) {
  setBookObject(fileName, "fontFamily", fontFamily);
}
export function getFontFamily(fileName) {
  return getBookObject(fileName, "fontFamily");
}
//主题存储和获取
export function saveThemes(themeName, theme) {
  return setLocalStorage(themeName, theme);
}
export function getThemes(themeName) {
  return getLocalStorage(themeName);
}
//阅读进度
export function saveLocation(fileName, location) {
  setBookObject(fileName, "location", location);
}
export function getLocation(fileName) {
  return getBookObject(fileName, "location");
}

//获取然后传入缓存存储
export function setBookObject(fileName, key, value) {
  let book = {};
  if (getLocalStorage(`${fileName}-info`)) {
    // console.log(getLocalStorage(`${fileName}-info`));
    book = getLocalStorage(`${fileName}-info`);
  }
  book[key] = value;
  setLocalStorage(`${fileName}-info`, book);
}
//得到字体
export function getBookObject(fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key];
  } else {
    return null;
  }
}
