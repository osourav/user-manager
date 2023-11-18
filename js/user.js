window.onload = async () => {
   // Initialize Firebase

   firebase.initializeApp(firebaseConfig);
   const analytics = firebase.analytics();
   const db = firebase.database();

   const localData = await getDataFromLocalStorage(localStorageKey);

   if (localData !== null) {
      DATABASE = localData;
      DATA = localData.datas;
      userName.innerText = DATABASE.username;
   }
   resetSection();

   historyColose.addEventListener("click", () => {
      historyWindow.classList.remove("active");
   });

   slideBack.addEventListener("click", () => {
      if (slideCount > 0) {
         slideCount--;
         slideNo.innerHTML = slideCount + 1;
         setHistory();
      }
   });

   slideNext.addEventListener("click", () => {
      const historyLen = DATABASE.history.length - 1;
      if ((slideCount + 1) * slideSize < historyLen) {
         slideCount++;
         slideNo.innerHTML = slideCount + 1;
         setHistory();
      }
   });

   showHistory.addEventListener("click", () => {
      mainMenu.classList.remove("active");
      historyWindow.classList.add("active");
      setHistory();
   });

   function showAlertMessage(
      message = `There was a problem with the connection. Please check your internet connection and try again.`
   ) {
      dbMessage.innerHTML = message;
      lodingWindow.classList.add("complete");
   }

   uploadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Export").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               showAlertMessage();
               return;
            }

            try {
               const usersRef = db.ref(val.username);
               const result = await usersRef.get();

               if (result.exists()) {
                  const value = result.val();
                  if (value.password == stringToB64(val.password)) {
                     await usersRef.update({
                        datas: DATABASE.datas,
                        history: DATABASE.history,
                     });
                     DATABASE.username = val.username;
                     userName.innerText = val.username;
                     showAlertMessage(
                        `Hello <b>${val.username}</b> your data successfully updated`
                     );
                     saveLocal();
                  } else {
                     showAlertMessage(`Incorrect password. Please try again.`);
                  }
               } else {
                  await usersRef.set({
                     date: Date.now(),
                     datas: DATABASE.datas,
                     history: DATABASE.history,
                     password: stringToB64(val.password),
                     username: val.username,
                  });
                  DATABASE.username = val.username;
                  userName.innerText = val.username;
                  saveLocal();
                  showAlertMessage(
                     `Hello <b>${val.username}</b> now your data successfully exported`
                  );
               }
            } catch (error) {
               showAlertMessage();
            }
         }
      });
   });

   downloadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Import").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               showAlertMessage();
               return;
            }
            try {
               const usersRef = db.ref(val.username);
               const result = await usersRef.get();

               if (result.exists()) {
                  const value = result.val();

                  if (value.password == stringToB64(val.password)) {
                     DATABASE.datas = value.datas;
                     DATA = value.datas;
                     DATABASE.history = value.history;
                     DATABASE.username = value.username;
                     userName.innerText = value.username;
                     saveLocal();
                     resetSection();
                     showAlertMessage(`Welcome, <b>${val.username}</b> Your data has been successfully imported.`);
                  } else {
                     showAlertMessage(`Incorrect password. Please try again.`);
                  }
               } else {
                  showAlertMessage(`The provided username <b>${val.username}</b>! does not exist. Please check and try again.`);
               }
            } catch (error) {
               showAlertMessage();
            }
         }
      });
   });

   changePassword.addEventListener("click", () => {
      createChangePasswordInput(flotingInput).then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               showAlertMessage();
               return;
            }
            try {
               const usersRef = db.ref(val.username);
               const result = await usersRef.get();

               if (result.exists()) {
                  const value = result.val();

                  if (value.password == stringToB64(val.oldPassword)) {
                     await usersRef.update({
                        password: stringToB64(val.newPassword),
                     });
                     saveLocal();
                     showAlertMessage(`Hello <b>${val.username}</b>! Your password has been changed successfully!`);
                  } else {
                     showAlertMessage(`Incorrect current password. Please try again.`);
                  }
               } else {
                  showAlertMessage(`The provided username <b>${val.username}</b> does not exist. Please check and try again.`);
               }
            } catch (error) {
               showAlertMessage();
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
