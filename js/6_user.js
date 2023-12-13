window.onload = async () => {
   const username = "osourav";
   const repoName = "user-manager";

   try {
      if (Android.is()) {
         const version = Android.getVersion() * 1;
         fetchDataFromGithub(username, repoName, "", ".json").then(async (d) => {
            const { data } = d[0];
            const onlineVerison = JSON.parse(data).version;

            if (onlineVerison > version) {
               const html = await fetchDataFromGithub(username, repoName, "", ".html");
               const htmlData = html[0].data;
               const bodyStartIndex = htmlData.indexOf("<body>");
               const bodyEndIndex = htmlData.indexOf("</body>");
               const htmlBody = htmlData.substring(bodyStartIndex + 6, bodyEndIndex);

               let htmlScript = "";
               const jss = await fetchDataFromGithub(username, repoName, "js", ".js");
               // add js file
               jss.forEach((js) => htmlScript += js.data);
               
               
               let htmlStyle = "";
               const iconCss = await fetchDataFromGithub(username, repoName, "icons/css", ".css");
               const csss = await fetchDataFromGithub(username, repoName, "css", ".css");

               // add css file
               htmlStyle = iconCss[0].data;
               csss.forEach((css) => htmlStyle += css.data );

               const HTML = 
`<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
<!-- styles -->
<style>
${htmlStyle}
</style>

   <!-- firebase scripts -->
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js" defer></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-analytics.js" defer></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js" defer></script>

</head>
<body>
   ${htmlBody}
   <script>
   ${htmlScript}
   </script>
</body>
</html>
`;
               Android.storeData(HTML, onlineVerison);
               window.location.reload();
            }
         });
      }
   } catch (error) {
      console.log("WEB APP RUNNING");
   }

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
      waitingWindow.classList.value = "";
   });

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

   function showAlertMessage(
      message = `There was a problem with the connection. Please check your internet connection and try again.`,
      fun
   ) {
      dbMessage.innerHTML = message;
      waitingWindow.classList.add("complete");
      if (fun) {
         dbOkBtn.addEventListener("click", () => fun());
      }
   }

   showHistory.addEventListener("click", () => {
      mainMenu.classList.remove("active");
      historyWindow.classList.add("active");
      setHistory();
   });

   clearAll.addEventListener("click", () => {
      showAlertMessage(
         `<b>Are you sure you want to <u>Clear all</u> the Data?</b>
         <br><small>After clear data reomve everything from your device.
          You con't Export! then lost everything.</small>`
      );
      waitingWindow.classList.add("others");
   });

   noBtn.addEventListener("click", () => {
      waitingWindow.classList.value = "";
   });

   yesBtn.addEventListener("click", () => {
      DATABASE.datas = [];
      DATABASE.history = [];
      DATABASE.username = "----";
      DATA = [];
      userName.innerText = "----";
      waitingWindow.classList.value = "";
      saveLocal();
      resetSection();
   });

   uploadData.addEventListener("click", () => {
      createImportExportInput(flotingInput, "Export").then(async (val) => {
         if (val !== null) {
            waitingWindow.classList.add("active");
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
                     showAlertMessage(`Hello <b>${val.username}</b> your data successfully updated`);
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
                  showAlertMessage(`Hello <b>${val.username}</b> now your data successfully exported`);
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
            waitingWindow.classList.add("active");
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
                  showAlertMessage(
                     `The provided username <b>${val.username}</b>! does not exist. Please check and try again.`
                  );
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
            waitingWindow.classList.add("active");
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
                  showAlertMessage(
                     `The provided username <b>${val.username}</b> does not exist. Please check and try again.`
                  );
               }
            } catch (error) {
               showAlertMessage();
            }
         }
      });
   });
};
