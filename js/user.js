let DATABASE = {
   username: "----",
   datas: [
      {
         name: "Section 1",
         active: true,
         users: [
            {
               name: "Shikha Barui",
               number: "7478103293",
               gender: "F",
               work: "Student",
               age: "18-22",
               location: "Kolkata",
            },
         ],
      },
      {
         name: "Section 2",
         active: true,
         users: [
            {
               name: "Subrata Barui",
               number: "7478103293",
               gender: "F",
               work: "Student",
               age: "13-22",
               location: "Kolkata",
            },
            {
               name: "Sheikh Sabir Ali Sheikh",
               number: "8250032643",
               gender: "M",
               work: "Student",
               age: "10-22",
               location: "Navrangpura ahemedabad/gujrat",
            },
            {
               name: "Subrata Barui",
               number: "7478103293",
               gender: "F",
               work: "Student",
               age: "14-22",
               location: "Kolkata",
            },
            {
               name: "Sukumar Barui",
               number: "8250032643",
               gender: "M",
               work: "Student",
               age: "18-22",
               location: "Kolkata",
            },
         ],
      },
      {
         name: "Section 3",
         active: true,
         users: [
            {
               name: "Pubali Maity",
               number: "7478103293",
               gender: "F",
               work: "Student",
               age: "18-22",
               location: "Kolkata",
            },
            {
               name: "Sourav Barui",
               number: "8250032643",
               gender: "M",
               work: "Student",
               age: "18-22",
               location: "Kolkata",
            },
         ],
      },
   ]
}
let DATA = DATABASE.datas;

const localStorageKey = "sb_user_manager";
const localData = getDataFromLocalStorage(localStorageKey);
if (localData !== null) {
   DATABASE = localData;
}
resetSection();

uploadData.addEventListener("click", () => {
   createImportExportInput(flotingInput, "Export").then(val => {
      if (val !== null) {
         console.log(val);

      }
   })
})

downloadData.addEventListener("click", () => {
   createImportExportInput(flotingInput, "Import").then(val => {
      if (val !== null) {
         console.log(val);

      }
   })
})

changePassword.addEventListener("click", () => {
   createChangePasswordInput(flotingInput).then(val => {
      if (val !== null) {
         console.log(val);
   
      }
   })
})








let clickInnerMenu = false;

openMainMenu.addEventListener("click", () => {
   mainMenu.classList.add("active");
});
menuInner.addEventListener("click", () => (clickInnerMenu = true), true);
mainMenu.addEventListener("click", () => {
   if (!clickInnerMenu) mainMenu.classList.remove("active");
   clickInnerMenu = false;
});

createSectionBtn.addEventListener("click", (e) => {
   createSectionInput(flotingInput).then((val) => {
      if (val !== null) {
         DATA.push({
            name: val,
            active: false,
            users: [],
         });
         resetSection();
      }
   });
});