import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
   set,
   get,
   getDatabase,
   ref,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

window.onload = async () => {
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const db = getDatabase();

   const localData = await getDataFromLocalStorage(localStorageKey);
   console.log(DATABASE);
   console.log(localData);

   if (localData !== null) {
      DATABASE = localData;
      DATA = localData.datas;
      userName.innerText = DATABASE.username;
   }
   resetSection();

   uploadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Export").then(async (val) => {
         if (val !== null) {
            try {
               const usersRef = ref(db, val.username);
               const result = await get(usersRef);
               
               if (result.exists()) {
                  const value = result.val();
                  
                  if (value.password == stringToB64(val.password)) {
                     await set(usersRef, {
                        username: val.username,
                        data: Date.now(),
                        datas: DATABASE.datas,
                        password: value.password,
                     });
                     DATABASE.username = val.username;
                     userName.innerText = value.username;
                     saveLocal();
                     console.log("success");
                  } else {
                     console.log("rong Password");
                  }
               } else {
                  await set(usersRef, {
                     username: val.username,
                     data: Date.now(),
                     datas: DATABASE.datas,
                     password: stringToB64(val.password),
                  });
                  DATABASE.username = val.username;
                  userName.innerText = val.username;
                  saveLocal();
                  console.log("new user success");
               }
               // console.log(result.val());
            } catch (error) {
               console.log(error);
            }
         }
      });
   });

   downloadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Import").then(async (val) => {
         if (val !== null) {
            try {
               const usersRef = ref(db, val.username);
               const result = await get(usersRef);

               if (result.exists()) {
                  const value = result.val();

                  if (value.password == stringToB64(val.password)) {
                     DATABASE.datas = value.datas;
                     DATA = value.datas;
                     DATABASE.username = value.username;
                     userName.innerText = value.username;
                     console.log("success");
                     saveLocal();
                     resetSection();
                  } else {
                     console.log("rong Password");
                  }
               }
               // console.log(result.val());
            } catch (error) {
               console.log(error);
            }
         }
      });
   });

   changePassword.addEventListener("click", () => {
      createChangePasswordInput(flotingInput).then((val) => {
         if (val !== null) {
            console.log(val);
         }
      });
   });
};

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
         saveLocal();
         resetSection();
      }
   });
});
