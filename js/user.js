window.onload = async () => {
   // Initialize Firebase

   firebase.initializeApp(firebaseConfig);
   const analytics = firebase.analytics();

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

   function internetProblemError() {
      dbMessage.innerHTML = `There was a problem with the connection. Please check your internet connection and try again.`;
      lodingWindow.classList.add("complete");
   }

   uploadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Export").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               internetProblemError();
               return;
            }
            
            try {
               let usersRef = firebase.database().ref(val.username);
               let dataRef = firebase.database().ref(val.username);

               let result = await dataRef.once("value");
               let value = result.val();

               if (
                  result.exists() &&
                  value.password == stringToB64(val.password)
               ) {
                  await usersRef.update({
                     datas: DATABASE.datas,
                  });

                  dbMessage.innerHTML = `Hi <b>${val.username}</b>! Your data has been successfully exported.`;
                  lodingWindow.classList.add("complete");
               } else {
                  dbMessage.innerHTML = `Incorrect password. Please try again.`;
                  lodingWindow.classList.add("complete");
               }
            } catch (error) {
               internetProblemError();
            }
         }
      });
   });

   downloadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Import").then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               internetProblemError();
               return;
            }
            try {
               let usersRef = firebase.database().ref(val.username);
               let result = await usersRef.get();

               if (result.exists()) {
                  let value = result.val();

                  if (value.password == stringToB64(val.password)) {
                     DATABASE.datas = value.datas;
                     DATA = value.datas;
                     DATABASE.username = value.username;
                     userName.innerText = value.username;
                     dbMessage.innerHTML = `Welcome, <b>${val.username}</b>! Your data has been successfully imported.`;
                     lodingWindow.classList.add("complete");
                     saveLocal();
                     resetSection();
                  } else {
                     dbMessage.innerHTML = `Incorrect password. Please try again.`;
                     lodingWindow.classList.add("complete");
                  }
               } else {
                  dbMessage.innerHTML = `The provided username <b>${val.username}</b> does not exist. Please check and try again.`;
                  lodingWindow.classList.add("complete");
               }
            } catch (error) {
               internetProblemError();
            }
         }
      });
   });

   changePassword.addEventListener("click", () => {
      createChangePasswordInput(flotingInput).then(async (val) => {
         if (val !== null) {
            lodingWindow.classList.add("active");
            if (!navigator.onLine) {
               internetProblemError();
               return;
            }
            try {
               let usersRef = firebase.database().ref(val.username);
               let result = await usersRef.get();

               if (result.exists()) {
                  let value = result.val();

                  if (value.password == stringToB64(val.oldPassword)) {
                     await usersRef.update({
                        password: stringToB64(val.newPassword),
                     });
                     saveLocal();
                     dbMessage.innerHTML = `Hi <b>${val.username}</b>! Your password has been changed successfully!`;
                     lodingWindow.classList.add("complete");
                  } else {
                     dbMessage.innerHTML = `Incorrect current password. Please try again.`;
                     lodingWindow.classList.add("complete");
                  }
               } else {
                  dbMessage.innerHTML = `The provided username <b>${val.username}</b> does not exist. Please check and try again.`;
                  lodingWindow.classList.add("complete");
               }
            } catch (error) {
               internetProblemError();
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
