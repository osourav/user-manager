const allSec = [];

function createUser(parent, values, baseIndex, userIndex) {
   const _ag = values.age + " ";
   const userOuter = CD(parent, "user-outer");
   const userEle = CD(userOuter, "user", "");
   /**/CP(userEle, "small-right name", "", values.name)
   /**/const number = CP(userEle, "number", "", values.number)
   /**/CP(userEle, "center", "", values.gender)
   /**/CP(userEle, "center small", "", values.work)
   /**/CP(userEle, "center small", "", `${_ag[0]}${_ag[1]}+`)
   /**/CP(userEle, "center small", "", values.location)

   const features = parent.parentElement.parentElement.querySelectorAll(".feature");
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

   function resetStyle() {
      userEle.classList.remove("inFeature");
      const computedStyle = window.getComputedStyle(userEle);
      const bgColor = computedStyle.getPropertyValue('--color0');
      userEle.style.setProperty("--color", bgColor);
   }

   function start(e) {
      posY = e.clientY;
      if (e.type == "touchstart") (posY = e.touches[0].clientY);
      eleY = 0;
   }

   function move(E) {
      if (!isHold) return;

      let e = E, ele = E.target;
      if (e.type == "touchmove") {
         e = e.touches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      features.forEach((feature) => {
         if (feature == ele){
            feature.classList.add("hover");
            const computedStyle = window.getComputedStyle(feature);
            const bgColor = computedStyle.getPropertyValue('--color');
            userEle.style.setProperty("--color", bgColor);
         } else {
            feature.classList.remove("hover");
         }
      })

      const is = [...features].some((feature) => {
         if (feature == ele){
            userEle.classList.add("inFeature");
            const computedStyle = window.getComputedStyle(feature);
            const bgColor = computedStyle.getPropertyValue('--color');
            userEle.style.setProperty("--color", bgColor);
            return true;
         }
      })
      if (!is) {
         resetStyle();
      }

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

   function holdingStart() {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay);
   }

   function holdingContinue() {
      isHold = true;
      parent.parentElement.parentElement.classList.add("current");
      allSec.forEach((sec) => {
         sec.classList.add("focus");
      });
   }

   function holdingEnd(E) {
      if (!isHold) return;

      let e = E, ele = E.target;
      if (e.type == "touchmove") {
         e = e.changedTouches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }


      [...features].some((feature) => {
         if (feature == ele){
            switch (feature) {
               case features[0]:
                  call(values.number);
                  resetStyle()
                  break;
               case features[1]:
                  openInWhatsapp(values.number);
                  resetStyle()
                  break;
               case features[2]:

                  resetSection();
                  break;
               case features[3]:

                  resetSection();
                  break;
            }
            return true;
         }
      })


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

   function copyNumber() {
      const num = number.innerText;
      if (!navigator.clipboard) {
         fallbackCopyTextToClipboard(num);
         return;
      }
      navigator.clipboard.writeText(num).then(function() {
         console.log("Copying to clipboard was successful!");
      }, function(err) {
         console.error("Could not copy text: ", err);
      });
   }

   number.addEventListener("click", copyNumber);

   userOuter.addEventListener("mousedown", holdingStart);
   window.addEventListener("mousedown", start);
   window.addEventListener("mousemove", move);
   window.addEventListener("mouseup", holdingEnd);

   userOuter.addEventListener("touchstart", holdingStart);
   window.addEventListener("touchstart", start);
   window.addEventListener("touchmove", move);
   window.addEventListener("touchend", holdingEnd);
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
   /*            */ const rename = CD(menu, "option cursor");
   /*                */ const renameI = CI(rename, `sbi-pencil1`);
   /*            */ const duplicate = CD(menu, "option cursor");
   /*                */ const duplicateI = CI(duplicate, `sbi-documents`);
   /*            */ const remove = CD(menu, "option cursor");
   /*                */ const removeI = CI(remove, `sbi-delete_forever`);
   /*        */ const menuBtn = CD(basic, "s-btn cursor");
   /*            */const menuBtnI = CI(menuBtn, "icon sbi-scatter_plot");
   /*        */ const nm = CD(basic, "name", "", name);
   /*    */ const features = CD(top, "features");
   /*        */ const fCall = CD(features, "feature call cursor");
   /*            */ const fCallI = CI(fCall, "sbi-phone");
   /*        */ const fWP = CD(features, "feature whatsapp cursor");
   /*            */ const fWPI = CI(fWP, "sbi-whatsapp");
   /*        */ const fEdit = CD(features, "feature edit cursor");
   /*            */ const fEditI = CI(fEdit, "sbi-pencil1");
   /*        */ const fDelete = CD(features, "feature delete cursor");
   /*            */ const fDeleteI = CI(fDelete, "sbi-delete");
   /*        */ const cUsrBtn = CD(basic, "s-btn cursor");
   /*            */ const cUsrBtnI = CI(cUsrBtn, "icon add mid sbi-person_add");
   /*        */ const tglBtn = CD(basic, "toggle-btn s-btn cursor");
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
      let ele = e.target;

      if (e.type == "touchend") {
         const { clientY, clientX } = e.changedTouches[0];
         ele = document.elementFromPoint(clientX, clientY);
      }

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

   function holdingStart() {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay * 2);
   }
   
   function holdingMove(E) {
      if (!isHold) return;
      let e = E, ele = e.target;

      if (e.type == "touchmove") {
         e = e.touches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      [rename, duplicate, remove].some((e) => {
         if (e == ele) {
            e.classList.add("hover");
         } else {
            e.classList.remove("hover");
         }
      });
   }

   menuBtn.addEventListener("mousedown", holdingStart);
   menuBtn.addEventListener("touchstart", holdingStart);
   window.addEventListener("mousemove", holdingMove);
   window.addEventListener("touchmove", holdingMove);
   window.addEventListener("mouseup", holdingEnd);
   window.addEventListener("touchend", holdingEnd);
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
