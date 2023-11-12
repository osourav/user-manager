const allSec = [];

function createUser(parent, values, baseIndex, userIndex) {
   const userOuter = CD(parent, "user-outer");
   const userEle = CD(
      userOuter,
      "user",
      "",
      `
      <p class="small-right">${values.name}</p>
      <p>${values.number}</p>
      <p class="center">${values.gender}</p>
      <p class="center small">${values.work}</p>
      <p class="center small">${values.age}</p>
      <p class="center small">${values.location}</p>
   `
   );

   let isHold = false;
   let holdTimerId;
   let posY = 0;
   let eleY = 0;
   let last = {
      is: false,
      bi: 0,
      ui: 0,
      mi: 0,
   };

   function start(ele, e) {
      posY = e.clientY;
      eleY = 0;
   }

   function move(ele, e) {
      const dy = e.clientY - posY;
      const scrollDistance = 30;
      const scrollOffset =
         document.documentElement.scrollHeight - window.innerHeight;
      const _d = 5;

      if (window.scrollY > 0 && e.clientY < scrollDistance) {
         window.scrollBy(0, -_d);
         eleY -= _d;
      } else if (
         scrollOffset > window.scrollY &&
         e.clientY > window.innerHeight - scrollDistance
      ) {
         window.scrollBy(0, _d);
         eleY += _d;
      }

      eleY += dy;
      userEle.style.top = `${eleY}px`;
      userOuter.classList.add("active");

      allSec.some((sec, moveIndex) => {
         if (!sec.classList.contains("current") && sec == ele) {
            last.is = true;
            last.bi = baseIndex;
            last.ui = userIndex;
            last.mi = moveIndex;
            userOuter.classList.add("placed");
            return true;
         } else {
            userOuter.classList.remove("placed");
            last.is = false;
         }
      });
      posY = e.clientY;
   }

   function holdingContinue() {
      isHold = true;
      parent.parentElement.parentElement.classList.add("current");
      allSec.forEach((sec) => {
         sec.classList.add("focus");
      });
   }

   function holdingEnd() {
      if (!isHold) return;
      isHold = false;
      parent.parentElement.parentElement.classList.remove("current");
      allSec.forEach((sec) => {
         sec.classList.remove("focus");
      });
      clearTimeout(holdTimerId);
      userOuter.classList.remove("active");

      if (last.is) {
         const { bi, ui, mi } = last;
         const user = dataBase[bi].users.splice(ui, 1);
         dataBase[mi].users.unshift(user[0]);
         resetSection();
      } else {
         eleY = 0;
         userEle.style.top = `${eleY}px`;
      }
      console.log("-----");
   }

   userOuter.addEventListener("mousedown", () => {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay);
   });

   document.body.addEventListener("mousedown", (e) => {
      start(e.target, e);
   });

   document.body.addEventListener("mousemove", (e) => {
      if (isHold) move(e.target, e);
   });

   window.addEventListener("mouseup", holdingEnd);
}

function createInputsForUser(parent, value, title = "Add User", btnName = "Create") {
   return new Promise((resolve) => {
      parent.classList.add("active");

      const id = Date.now();

      const fWindow = `
      <div class="floting-window" id="fw${id}">
         <p>${title}</p>
         <button id="c${id}" class="close"><i class="sbi-close"></i></button>
         <div id="user-input-name">
            <i class="sbi-user1"></i>
            <input class="w${id}" type="text" placeholder="Name">
         </div>
         <div id="input-mobile">
            <i class="sbi-phone1"></i>
            <input class="w${id}" type="text" placeholder="Mobile No">
         </div>
         <div id="input-gender">
            <i class="sbi-transgender-alt"></i>
            <select class="w${id}">
               <option value="M">Male</option>
               <option value="F">Female</option>
               <option value="O">Others</option>
            </select>
         </div>
         <div id="input-work">
            <i class="sbi-work"></i>
            <input class="w${id}" type="text" placeholder="Work">
         </div>
         <div id="input-age">
            <i class="sbi-height"></i>
            <input class="w${id}" type="text" placeholder="Age">
         </div>
         <div id="input-location">
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
      const inputs = document.querySelectorAll(`.w${id}`);
      const cancle = document.getElementById(`c${id}`);
      const create = document.getElementById(`n${id}`);
      const fw = document.getElementById(`fw${id}`);
      const paste = document.getElementById(`p${id}`);

      if (value) {
         const { name, number, gender, work, age, location } = value;
         inputs[0].value = name;
         inputs[1].value = number;
         inputs[2].selectedIndex = gender == "M" ? 0 : gender == "F" ? 1 : 2;
         inputs[3].value = work;
         inputs[4].value = age;
         inputs[5].value = location;
      }

      let isSectionOuter = false;

      const setIsSectionTrue = () => (isSectionOuter = true);
      const resetBorder = (input) => (input.style.border = "none");
      const closeSingle = (is = true) => {
         parent.classList.remove("active");
         parent.innerHTML = "";
         removeEventListener();
         if (is) resolve(null);
      };
      const closeAll = () => {
         if (!isSectionOuter) closeSingle();
         isSectionOuter = false;
      };
      const pestInputs = async () => {
         const text = await navigator.clipboard.readText();
         const { name, number, genIndx, work, age, location } =
            getFormatInput(text);

         inputs[0].value = name;
         inputs[1].value = number;
         inputs[2].selectedIndex = genIndx;
         inputs[3].value = work;
         inputs[4].value = age;
         inputs[5].value = location;
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
            removeEventListener();
            closeSingle(false);
            resolve(obj);
         } else {
            inputs.forEach((input) => {
               if (input.value.length <= 0)
                  input.style.border = "1px solid #f00";
            });
         }
      };
      const removeEventListener = () => {
         inputs.forEach((input) => {
            input.removeEventListener("input", () => resetBorder(input));
         });
         parent.removeEventListener("click", closeAll);
         fw.removeEventListener("click", setIsSectionTrue, true);
         paste.removeEventListener("click", pestInputs);
         cancle.removeEventListener("click", closeSingle);
         create.removeEventListener("click", sendValue);
      };

      inputs.forEach((input) => {
         input.addEventListener("input", () => resetBorder(input));
      });
      parent.addEventListener("click", closeAll);
      fw.addEventListener("click", setIsSectionTrue, true);
      paste.addEventListener("click", pestInputs);
      cancle.addEventListener("click", closeSingle);
      create.addEventListener("click", sendValue);
   });
}

function createSingleInputWindow(
   title = "Add Section",
   placeholder = "Enter Name",
   buttonName = "Create"
) {
   singleInput.classList.add("active");
   const id = Date.now();

   singleInput.innerHTML = `
   <div class="floting-window" id="fw${id}">
      <p>${title}</p>
      <button class="close cnacle-for-all" id="c${id}"><i class="sbi-close"></i></button>
      <div id="input-name">
         <i class="sbi-text_fields"></i>
         <input type="text" id="in${id}" placeholder="${placeholder}" >
      </div>
      <div class="buttons">
         <button id="con${id}"><i class="sbi-check2"></i>${buttonName}</button>
      </div>
   </div>
   `;

   return new Promise((resolve) => {
      const closeButton = document.getElementById(`c${id}`);
      const inputValue = document.getElementById(`in${id}`);
      const singleInputElement = document.getElementById(`con${id}`);
      const flotingWindow = document.getElementById(`fw${id}`);
      inputValue.select();

      let isSectionOuter = false;
      const setIsSectionTrue = () => (isSectionOuter = true);
      const resetBorder = () => (inputValue.style.border = "none");
      const closeSingle = (is = true) => {
         singleInput.classList.remove("active");
         singleInput.innerHTML = "";
         removeEventListener();
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
         removeEventListener();
         resolve(name);
      };

      const removeEventListener = () => {
         singleInput.removeEventListener("click", closeAll);
         flotingWindow.removeEventListener("click", setIsSectionTrue, true);
         closeButton.removeEventListener("click", closeSingle);
         inputValue.removeEventListener("input", resetBorder);
         singleInputElement.removeEventListener("click", sendValue);
      };

      singleInput.addEventListener("click", closeAll);
      flotingWindow.addEventListener("click", setIsSectionTrue, true);
      closeButton.addEventListener("click", closeSingle);
      inputValue.addEventListener("input", resetBorder);
      singleInputElement.addEventListener("click", sendValue);
   });
}

function createSection(name, active, index, users = []) {
   const sec = CS(itsMain, `sec${active ? " active" : ""}`);
   /**/ const top = CD(sec, "top");
   /*    */ const basic = CD(top, "basic");
   /*        */ const menu = CD(basic, "menu-options");
   /*            */ const rename = CD(menu, "option");
   /*                */ const renameI = CI(rename, `sbi-pencil1`);
   /*            */ const duplicate = CD(menu, "option");
   /*                */ const duplicateI = CI(duplicate, `sbi-clone`);
   /*            */ const remove = CD(menu, "option");
   /*                */ const removeI = CI(remove, `sbi-delete_sweep`);
   /*        */ const menuBtn = CI(basic, "icon sbi-dots-three-vertical");
   /*        */ const nm = CD(basic, "name", "", name);
   /*        */ const cUsrBtn = CI(basic, "icon add mid sbi-person_add");
   /*        */ const tglBtn = CD(basic, "toggle-btn");
   /*            */ const hid = CI(tglBtn, "icon big sbi-remove1");
   /*            */ const sow = CI(tglBtn, "icon big sbi-keyboard_arrow_down");
   /**/ const inner = CD(sec, "inner-sec");
   /*    */ const tags = CD(inner, "tags");
   /*        */ const tNmae = CD(tags, "nmae", "", "Name");
   /*        */ const tPhone = CD(tags, "phone", "", "Mobile No");
   /*        */ const tGender = CD(tags, "center gender", "", "Gn");
   /*        */ const tWork = CD(tags, "center work", "", "Work");
   /*        */ const tAge = CD(tags, "center age", "", "Age");
   /*        */ const tLoction = CD(tags, "center location", "", "Location");
   /*    */ const userList = CD(inner, "user-list");

   allSec.push(sec);

   users.forEach((user, i) => {
      createUser(userList, user, index, i);
   });

   tglBtn.addEventListener("click", () => {
      dataBase[index].active = !dataBase[index].active;
      sec.classList.toggle("active", dataBase[index].active);
   });

   cUsrBtn.addEventListener("click", () => {
      createInputsForUser(multiInput).then((obj) => {
         if (obj !== null) {
            dataBase[index].users.push(obj);
            dataBase[index].active = true;
            resetSection();
         }
      });
   });

   // holding event handlers
   let isHold = false;
   let holdTimerId;

   function holdingContinue() {
      console.log("continue");
      menu.classList.add("active");
   }

   function holdingEnd(e) {
      if (!isHold) return;
      isHold = false;
      clearTimeout(holdTimerId);
      const ele = e.target;

      [rename, duplicate, remove].some((e) => {
         if (e == ele) {
            switch (ele) {
               case rename:
                  createSingleInputWindow("Rename Section", "New Name", "Rename").then((val) => {
                     if (val !== null) {
                        dataBase[index].name = val;
                        nm.innerHTML = val;
                     }
                  });
                  break;
               case duplicate:
                  const copy = dataBase[index];
                  dataBase.insert(index, {
                     name: `${copy.name} copy`,
                     active: false,
                     users: copy.users,
                  });
                  resetSection();
                  break;
               case remove:
                  dataBase.splice(index, 1);
                  resetSection();
                  break;
            }
            return true;
         }
      });

      menu.classList.remove("active");
      console.log("-----");
   }

   menuBtn.addEventListener("mousedown", () => {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay * 2);
   });

   window.addEventListener("mouseup", holdingEnd);
}

createSectionBtn.addEventListener("click", (e) => {
   createSingleInputWindow().then((val) => {
      if (val !== null) {
         dataBase.push({
            name: val,
            active: false,
            users: [],
         });
         resetSection();
      }
   });
});

function resetSection() {
   allSec.length = 0;
   itsMain.innerHTML = "";
   dataBase.forEach((section, i) => {
      createSection(section.name, section.active, i, section.users);
   });
}
resetSection();
