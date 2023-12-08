let DATABASE = {
   datas: [],
   history: [],
   version: "0.9",
   username: "----",
};

let DATA = DATABASE.datas;
const localStorageKey = "sb_user_manager";
const holdDelay = 500;
const allSec = [];
const slideSize = 20;
const MAX_HISTORY = 500;
let slideCount = 0;
let lastScroll = window.scrollY;

/* ----  local storage set and get ---- */
function setDataFromLocalStorage(key, object) {
   let data = JSON.stringify(object);
   localStorage.setItem(key, data);
}
function getDataFromLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key));
}
function deleteDataFromLocalStorage(key) {
   return localStorage.removeItem(key);
}
function saveLocal() {
   DATABASE.datas = DATA;
   setDataFromLocalStorage(localStorageKey, DATABASE);
}
function addHistoryForRemoveSession(section, operation = "DELETE") {
   section.users.forEach((user) => {
      saveHistoryInDB(user, section.name, operation);
   });
}
function saveHistoryInDB(user, sectionName, operation) {
   const currentDate = new Date();
   const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
   };

   const formattedDate = currentDate.toLocaleString("en-US", options);
 
   DATABASE.history.unshift({
      ...user,
      date: formattedDate,
      operation: operation,
      sessinonName: sectionName,
   });
   if (DATABASE.history.length > MAX_HISTORY) {
      DATABASE.history.pop();
   }
}
