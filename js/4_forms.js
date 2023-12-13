function createChangePasswordInput(parent) {
   parent.classList.add("active");
   const id = Date.now();

   parent.innerHTML = `
   <div class="floting-window one" id="fw${id}">
      <p>Update Password</p>
      <button class="close cnacle-for-all" id="c${id}"><i class="sbi-close"></i></button>
      <div class="input-username">
         <i class="sbi-user1"></i>
         <input type="text" class="inputs${id}" placeholder="Enter Username">
      </div>
      <div class="input-password">
         <i class="sbi-key2"></i>
         <input type="password" class="inputs${id}" placeholder="Enter Current Password">
         <div class="pass-show-hide-btn cursor" id="sh${id}">
            <i class="sbi-eye1"></i>
            <i class="sbi-eye-slash"></i>
         </div>
      </div>
      <div class="input-password">
         <i class="sbi-key2"></i>
         <input type="password" class="inputs${id}" placeholder="Enter New Password">
         <div class="pass-show-hide-btn cursor" id="nsh${id}">
            <i class="sbi-eye1"></i>
            <i class="sbi-eye-slash"></i>
         </div>
      </div>
      <div class="buttons">
         <button id="con${id}"><i class="sbi-check2"></i>Change</button>
      </div>
   </div>
   `;

   return new Promise((resolve) => {
      const closeButton = parent.querySelector(`#c${id}`);
      const inputs = parent.querySelectorAll(`.inputs${id}`);
      const submit = parent.querySelector(`#con${id}`);
      const fw = parent.querySelector(`#fw${id}`);
      const showHideOldBtn = parent.querySelector(`#sh${id}`);
      const showHideNewBtn = parent.querySelector(`#nsh${id}`);
      inputs[0].select();

      let isSectionOuter = false;
      let showOldPassword = false;
      let showNewPassword = false;
      const setIsSectionTrue = () => (isSectionOuter = true);
      const setBorder = () => {
         inputs.forEach((inp) => {
            if (inp.value.length <= 0) inp.style.border = "1px solid #f00";
         });
      };
      const resetBorder = (input) => (input.style.border = "none");
      const showHideOldPass = () => {
         showOldPassword = !showOldPassword;
         showHideOldBtn.classList.toggle("active", showOldPassword);
         if (showOldPassword) inputs[1].type = "text";
         else inputs[1].type = "password";
      };
      const showHideNewPass = () => {
         showNewPassword = !showNewPassword;
         showHideNewBtn.classList.toggle("active", showNewPassword);
         if (showNewPassword) inputs[2].type = "text";
         else inputs[2].type = "password";
      };
      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeAllEventListener();
         if (is) resolve(null);
      };
      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };
      const sendValue = () => {
         const nInputs = [...inputs].map((input) => input.value);
         if (nInputs.every((input) => input.length > 0)) {
            closeSingle(false);
            removeAllEventListener();
            resolve({
               username: inputs[0].value.toLowerCase(),
               oldPassword: inputs[1].value,
               newPassword: inputs[2].value,
            });
         } else {
            setBorder();
         }
      };
      const keyEnter = (e) => {
         if (e.keyCode === 13) sendValue();
      };

      const removeAllEventListener = () => {
         fw.removeEventListener("keydown", keyEnter);
         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         closeButton.removeEventListener("click", closeSingle);
         submit.removeEventListener("click", sendValue);
         showHideOldBtn.removeEventListener("click", showHideOldPass);
         showHideNewBtn.removeEventListener("click", showHideNewPass);
         inputs.forEach((inp) =>
            inp.removeEventListener("input", () => resetBorder(inp))
         );
      };

      fw.addEventListener("keydown", keyEnter);
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      closeButton.addEventListener("click", closeSingle);
      submit.addEventListener("click", sendValue);
      showHideOldBtn.addEventListener("click", showHideOldPass);
      showHideNewBtn.addEventListener("click", showHideNewPass);
      inputs.forEach((inp) =>
         inp.addEventListener("input", () => resetBorder(inp))
      );
   });
}

function createImportExportInput(parent, operationName = "Export") {
   parent.classList.add("active");
   const id = Date.now();

   parent.innerHTML = `
   <div class="floting-window one" id="fw${id}">
      <p>${operationName} Data</p>
      <button class="close cnacle-for-all" id="c${id}"><i class="sbi-close"></i></button>
      <div class="input-username">
         <i class="sbi-user1"></i>
         <input type="text" class="inputs${id}" placeholder="Enter Username">
      </div>
      <div class="input-password">
         <i class="sbi-key2"></i>
         <input type="password" class="inputs${id}" placeholder="Enter Password">
         <div class="pass-show-hide-btn cursor" id="sh${id}">
            <i class="sbi-eye1"></i>
            <i class="sbi-eye-slash"></i>
         </div>
      </div>
      <div class="buttons">
         <button id="con${id}"><i class="sbi-check2"></i>${operationName}</button>
      </div>
   </div>
   `;

   return new Promise((resolve) => {
      const closeButton = parent.querySelector(`#c${id}`);
      const inputs = parent.querySelectorAll(`.inputs${id}`);
      const submit = parent.querySelector(`#con${id}`);
      const fw = parent.querySelector(`#fw${id}`);
      const showHideBtn = parent.querySelector(`#sh${id}`);
      inputs[0].select();

      let isSectionOuter = false;
      let showPassword = false;
      const setIsSectionTrue = () => (isSectionOuter = true);
      const setBorder = () => {
         inputs.forEach((inp) => {
            if (inp.value.length <= 0) inp.style.border = "1px solid #f00";
         });
      };
      const resetBorder = (input) => (input.style.border = "none");
      const showHidePass = () => {
         showPassword = !showPassword;
         showHideBtn.classList.toggle("active", showPassword);
         if (showPassword) inputs[1].type = "text";
         else inputs[1].type = "password";
      };
      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeAllEventListener();
         if (is) resolve(null);
      };
      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };
      const sendValue = () => {
         const nInputs = [...inputs].map((input) => input.value);
         if (nInputs.every((input) => input.length > 0)) {
            closeSingle(false);
            removeAllEventListener();
            resolve({
               username: inputs[0].value.toLowerCase(),
               password: inputs[1].value,
            });
         } else {
            setBorder();
         }
      };
      const keyEnter = (e) => {
         if (e.keyCode === 13) sendValue();
      };

      const removeAllEventListener = () => {
         fw.removeEventListener("keydown", keyEnter);
         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         closeButton.removeEventListener("click", closeSingle);
         submit.removeEventListener("click", sendValue);
         showHideBtn.removeEventListener("click", showHidePass);
         inputs.forEach((inp) =>
            inp.removeEventListener("input", () => resetBorder(inp))
         );
      };

      fw.addEventListener("keydown", keyEnter);
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      closeButton.addEventListener("click", closeSingle);
      submit.addEventListener("click", sendValue);
      showHideBtn.addEventListener("click", showHidePass);
      inputs.forEach((inp) =>
         inp.addEventListener("input", () => resetBorder(inp))
      );
   });
}

function createAddUserInput(
   parent,
   value,
   title = "Add User",
   btnName = "Create"
) {
   return new Promise((resolve) => {
      parent.classList.add("active");

      const id = Date.now();

      const fWindow = `
      <div class="floting-window" id="fw${id}">
         <p>${title}</p>
         <button id="c${id}" class="close"><i class="sbi-close"></i></button>
         <div class="user-input-name">
            <i class="sbi-user1"></i>
            <input class="w${id}" type="text" placeholder="Name">
         </div>
         <div class="input-mobile">
            <i class="sbi-phone1"></i>
            <input class="w${id}" type="text" placeholder="Mobile No">
         </div>
         <div class="input-gender">
            <i class="sbi-transgender-alt"></i>
            <select class="w${id}">
               <option value="M">Male</option>
               <option value="F">Female</option>
               <option value="O">Others</option>
            </select>
         </div>
         <div class="input-work">
            <i class="sbi-work"></i>
            <input class="w${id}" type="text" placeholder="Work">
         </div>
         <div class="input-age">
            <i class="sbi-height"></i>
            <input class="w${id}" type="text" placeholder="Age">
         </div>
         <div class="input-location">
            <i class="sbi-location1"></i>
            <input class="w${id}" type="text" placeholder="Location">
         </div>
         <div class="buttons">
            <button id="p${id}"><i class="sbi-content_paste"></i>Paste</button>
            <button id="n${id}"><i class="sbi-check2"></i>${btnName}</button>
         </div>
      </div>
   `;

      parent.innerHTML = fWindow;

      const inputs = parent.querySelectorAll(`.w${id}`);
      const cancle = parent.querySelector(`#c${id}`);
      const create = parent.querySelector(`#n${id}`);
      const fw = parent.querySelector(`#fw${id}`);
      const paste = parent.querySelector(`#p${id}`);
      let isSectionOuter = false;

      const setIsSectionTrue = () => (isSectionOuter = true);
      const resetBorder = (input) => (input.style.border = "none");
      const setBorder = () => {
         inputs.forEach((inp) => {
            if (inp.value.length <= 0) inp.style.border = "1px solid #f00";
         });
      };
      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeAllEventListener();
         if (is) resolve(null);
      };
      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };
      const pasetHelpFun = (vals) => {
         const { name, number, genIndx, work, age, location } = vals;

         if (!isNaN(number) && number.length >= 10 && isNaN(location)) {
            inputs[0].value = name;
            inputs[1].value = number;
            inputs[2].selectedIndex = genIndx;
            inputs[3].value = work;
            inputs[4].value = age;
            inputs[5].value = location;
         }
      };
      const pasteInputs = () => {
         try {
            const text = Android.getClipboardTextFromJava();
            const vals = getFormatInput(text);
            if (vals == null) return;
            pasetHelpFun(vals);
         } catch (error) {
            console.log("Web App");
         } finally {
            navigator.clipboard
               .readText()
               .then((text) => {
                  const vals = getFormatInput(text);
                  if (vals == null) return;
                  pasetHelpFun(vals);
               })
               .catch((err) => {
                  console.log(err);
               });
         }
      };
      const sendValue = () => {
         const nInputs = [...inputs].map((input) => input.value);
         if (nInputs.every((input) => input.length > 0)) {
            const obj = {
               name: nInputs[0],
               number: nInputs[1],
               gender: nInputs[2],
               work: nInputs[3],
               age: nInputs[4],
               location: nInputs[5],
            };
            removeAllEventListener();
            closeSingle(false);
            resolve(obj);
         } else {
            setBorder();
         }
      };
      const keyEnter = (e) => {
         if (e.keyCode === 13) sendValue();
      };

      if (value) {
         const { name, number, gender, work, age, location } = value;
         inputs[0].value = name;
         inputs[1].value = number;
         inputs[2].selectedIndex = gender == "M" ? 0 : gender == "F" ? 1 : 2;
         inputs[3].value = work;
         inputs[4].value = age;
         inputs[5].value = location;
      } else {
         // trying to auto paste inputs
         pasteInputs();
      }

      const removeAllEventListener = () => {
         fw.removeEventListener("keydown", keyEnter);
         inputs.forEach((inp) => {
            inp.removeEventListener("input", () => resetBorder(inp));
         });
         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         paste.removeEventListener("click", pasteInputs);
         cancle.removeEventListener("click", closeSingle);
         create.removeEventListener("click", sendValue);
      };

      inputs.forEach((inp) => {
         inp.addEventListener("input", () => resetBorder(inp));
      });

      fw.addEventListener("keydown", keyEnter);
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      paste.addEventListener("click", pasteInputs);
      cancle.addEventListener("click", closeSingle);
      create.addEventListener("click", sendValue);
   });
}

function createMultiAddUserInput(parent) {
   return new Promise((resolve) => {
      parent.classList.add("active");

      const id = Date.now();

      const fWindow = `
      <div class="floting-window" id="fw${id}">
         <p>Add Multi User</p>
         <button id="c${id}" class="close"><i class="sbi-close"></i></button>
         
         <div class="input-text single" id="io${id}">
            <textarea rows="8" cols="100" id="w${id}" type="text" placeholder="Paset Text"></textarea>
         </div>

         <div class="find-user">
            <p>Results Found</p>
            <span id="fr${id}">0</span>
         </div>

         <div class="buttons">
            <button id="paset${id}"><i class="sbi-content_paste"></i>Paste</button>
            <button id="n${id}"><i class="sbi-check2"></i>Create</button>
         </div>
      </div>
   `;

      parent.innerHTML = fWindow;

      let users = [];

      const inputOuter = parent.querySelector(`#io${id}`);
      const input = parent.querySelector(`#w${id}`);
      const cancle = parent.querySelector(`#c${id}`);
      const fw = parent.querySelector(`#fw${id}`);
      const paste = parent.querySelector(`#paset${id}`);
      const create = parent.querySelector(`#n${id}`);
      const resultFound = parent.querySelector(`#fr${id}`);
      let isSectionOuter = false;

      const setIsSectionTrue = () => (isSectionOuter = true);
      const resetBorder = () => (inputOuter.style.outline = "none");
      const setBorder = () => (inputOuter.style.outline = "3px solid #f00");

      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeAllEventListener();
         if (is) resolve(null);
      };

      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };

      const getUsersFromMixText = () => {
         if (input.value != "") {
            users = getFormatInputForMultiUser(input.value);
         } else {
            users = [];
         }
         resultFound.innerText = users.length;
      };

      const pasteInputs = () => {
         try {
            const text = Android.getClipboardTextFromJava();
            if (text == null) return;
            input.value = text;
            getUsersFromMixText();
         } catch (error) {
            console.log("Web App");
         } finally {
            navigator.clipboard
               .readText()
               .then((text) => {
                  if (text == null) return;
                  input.value = text;
                  getUsersFromMixText();
               })
               .catch((err) => {
                  getUsersFromMixText();
                  console.log(err);
               });
         }
      };

      const sendValue = () => {
         if (users.length > 0) {
            removeAllEventListener();
            closeSingle(false);
            resolve({ users: users });
         } else {
            setBorder();
         }
      };

      pasteInputs();

      const removeAllEventListener = () => {
         input.removeEventListener("input", resetBorder);
         input.removeEventListener("input", debounce(getUsersFromMixText, 2000));

         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         paste.removeEventListener("click", pasteInputs);
         cancle.removeEventListener("click", closeSingle);
         create.removeEventListener("click", sendValue);
      };

      input.addEventListener("input", resetBorder);
      input.addEventListener("input", debounce(getUsersFromMixText, 2000));
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      paste.addEventListener("click", pasteInputs);
      cancle.addEventListener("click", closeSingle);
      create.addEventListener("click", sendValue);
   });
}

function createSectionInput(
   parent,
   name = "",
   title = "Add Section",
   placeholder = "Enter Name",
   buttonName = "Create"
) {
   parent.classList.add("active");
   const id = Date.now();

   parent.innerHTML = `
   <div class="floting-window one" id="fw${id}">
      <p>${title}</p>
      <button class="close cnacle-for-all" id="c${id}"><i class="sbi-close"></i></button>
      <div class="input-name">
         <i class="sbi-text_fields"></i>
         <input type="text" id="in${id}" placeholder="${placeholder}" value="${name}">
      </div>
      <div class="buttons">
         <button id="con${id}"><i class="sbi-check2"></i>${buttonName}</button>
      </div>
   </div>
   `;

   return new Promise((resolve) => {
      const closeButton = parent.querySelector(`#c${id}`);
      const inputValue = parent.querySelector(`#in${id}`);
      const submit = parent.querySelector(`#con${id}`);
      const fw = parent.querySelector(`#fw${id}`);
      inputValue.select();

      let isSectionOuter = false;
      const setIsSectionTrue = () => (isSectionOuter = true);
      const resetBorder = () => (inputValue.style.border = "none");
      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeAllEventListener();
         if (is) resolve(null);
      };
      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };
      const sendValue = () => {
         const name = inputValue.value;
         if (!name) {
            inputValue.style.border = "1px solid #f00";
            return;
         }
         closeSingle(false);
         removeAllEventListener();
         resolve(name);
      };
      const keyEnter = (e) => {
         if (e.keyCode === 13) sendValue();
      };

      const removeAllEventListener = () => {
         fw.removeEventListener("keydown", keyEnter);
         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         closeButton.removeEventListener("click", closeSingle);
         inputValue.removeEventListener("input", resetBorder);
         submit.removeEventListener("click", sendValue);
      };

      fw.addEventListener("keydown", keyEnter);
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      closeButton.addEventListener("click", closeSingle);
      inputValue.addEventListener("input", resetBorder);
      submit.addEventListener("click", sendValue);
   });
}
