let DATABASE = {
   username: "----",
   datas: []
   // [
   //    {
   //       name: "Section 1",
   //       active: true,
   //       users: [
   //          {
   //             name: "Shikha Barui",
   //             number: "7478103293",
   //             gender: "F",
   //             work: "Student",
   //             age: "18-22",
   //             location: "Kolkata",
   //          },
   //       ],
   //    },
   //    {
   //       name: "Section 2",
   //       active: true,
   //       users: [
   //          {
   //             name: "Subrata Barui",
   //             number: "7478103293",
   //             gender: "F",
   //             work: "Student",
   //             age: "13-22",
   //             location: "Kolkata",
   //          },
   //          {
   //             name: "Sheikh Sabir Ali Sheikh",
   //             number: "8250032643",
   //             gender: "M",
   //             work: "Student",
   //             age: "10-22",
   //             location: "Navrangpura ahemedabad/gujrat",
   //          },
   //          {
   //             name: "Subrata Barui",
   //             number: "7478103293",
   //             gender: "F",
   //             work: "Student",
   //             age: "14-22",
   //             location: "Kolkata",
   //          },
   //          {
   //             name: "Sukumar Barui",
   //             number: "8250032643",
   //             gender: "M",
   //             work: "Student",
   //             age: "18-22",
   //             location: "Kolkata",
   //          },
   //       ],
   //    },
   //    {
   //       name: "Section 3",
   //       active: true,
   //       users: [
   //          {
   //             name: "Pubali Maity",
   //             number: "7478103293",
   //             gender: "F",
   //             work: "Student",
   //             age: "18-22",
   //             location: "Kolkata",
   //          },
   //          {
   //             name: "Sourav Barui",
   //             number: "8250032643",
   //             gender: "M",
   //             work: "Student",
   //             age: "18-22",
   //             location: "Kolkata",
   //          },
   //       ],
   //    },
   // ]
}

let DATA = DATABASE.datas;
const localStorageKey = "sb_user_manager";

/* ----  local storage set and get ---- */
function setDataFromLocalStorage(key, object) {
   let data = JSON.stringify(object);
   localStorage.setItem(key, data);
}
function getDataFromLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key))
}
function deleteDataFromLocalStorage(key) {
   return localStorage.removeItem(key);
}

function saveLocal() {
   setDataFromLocalStorage(localStorageKey, DATABASE);
}