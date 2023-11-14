import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
   set,
   get,
   getDatabase,
   update,
   ref,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

window.onload = async () => {
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const db = getDatabase();

   const localData = await getDataFromLocalStorage(localStorageKey);

   if (localData !== null) {
      DATABASE = localData;
      DATA = localData.datas;
      userName.innerText = DATABASE.username;
   }
   resetSection();

   uploadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Export").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            try {
               const usersRef = ref(db, val.username);
               const result = await get(usersRef);
               
               if (result.exists()) {
                  const value = result.val();
                  
                  if (value.password == stringToB64(val.password)) {
                     await update(usersRef, {
                        datas: DATABASE.datas,
                     });
                     console.log("success");
                     dbMessage.innerHTML = `Hello '<b>${val.username}</b>' your data successfully updated`;
                     lodingWindow.classList.add("complete");
                  } else {
                     dbMessage.innerHTML = `Password not Match!`;
                     lodingWindow.classList.add("complete");
                  }
               } else {
                  await set(usersRef, {
                     username: val.username,
                     date: Date.now(),
                     datas: DATABASE.datas,
                     password: stringToB64(val.password),
                  });
                  DATABASE.username = val.username;
                  userName.innerText = val.username;
                  saveLocal();
                  dbMessage.innerHTML = `Hello '<b>${val.username}</b>' now your data successfully exported`;
                  lodingWindow.classList.add("complete");
               }
            } catch (error) {
               dbMessage.innerHTML = error;
               lodingWindow.classList.add("complete");
            }
         }
      });
   });

   downloadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Import").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
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
                     dbMessage.innerHTML = `Welcome '<b>${val.username}</b>' now your data successfully imported`;
                     lodingWindow.classList.add("complete");
                     saveLocal();
                     resetSection();
                  } else {
                     dbMessage.innerHTML = `Password not Match!`;
                     lodingWindow.classList.add("complete");
                  }
               }
               // console.log(result.val());
            } catch (error) {
               console.log(error);
               dbMessage.innerHTML = error;
               lodingWindow.classList.add("complete");
            }
         }
      });
   });

   changePassword.addEventListener("click", () => {
      createChangePasswordInput(flotingInput).then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            try {
               const usersRef = ref(db, val.username);
               const result = await get(usersRef);

               if (result.exists()) {
                  const value = result.val();

                  if (value.password == stringToB64(val.oldPassword)) {
                     await update(usersRef, {
                        password: stringToB64(val.newPassword),
                     });
                     saveLocal();
                     dbMessage.innerHTML = `Hello '<b>${val.username}</b>' now your passowrd successfully updated`;
                     lodingWindow.classList.add("complete");
                  } else {
                     dbMessage.innerHTML = `old password not match !`;
                     lodingWindow.classList.add("complete");
                  }
               }
               // console.log(result.val());
            } catch (error) {
               dbMessage.innerHTML = error;
               lodingWindow.classList.add("complete");
            }
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

dbOkBtn.addEventListener("click", () => {
   lodingWindow.classList.value = "";
});