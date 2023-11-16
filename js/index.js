function createUser(parent, values, baseIndex, userIndex) {
   const userOuter = CD(parent, "user-outer");
   const userEle = CD(userOuter, "user", "");
   const oAge = getFormatText(values.age, 2);

   const nm = getFormatText(values.name, 18, true);
   const nu = values.number;
   const wk = getFormatText(values.work, 9, true);
   const ag = !isNaN(oAge[0]) ? oAge + "+" : oAge == "yes" ? "18+" : "18-";
   const lo = getFormatText(values.location, 9, true);

   /**/ CP(userEle, "small-right name", "", nm);
   /**/ const number = CP(userEle, "number", "", nu);
   /**/ CP(userEle, "center", "", values.gender);
   /**/ CP(userEle, "center small", "", wk);
   /**/ CP(userEle, "center small", "", ag);
   /**/ CP(userEle, "center small", "", lo);

   const features =
      parent.parentElement.parentElement.querySelectorAll(".feature");
   let isHold = false;
   let holdTimerId;

   function resetStyle() {
      userEle.classList.remove("inFeature");
      const computedStyle = window.getComputedStyle(userEle);
      const bgColor = computedStyle.getPropertyValue("--color0");
      userEle.style.setProperty("--color", bgColor);
   }

   function getElementIndex(ele) {
      const eles = parent.childNodes;
      for (let i = 0; i < eles.length; i++) {
         if (ele == eles[i]) return i;
      }
      return -1;
   }

   function setUserClassUpDown(start, end, cls, posIndex) {
      const eles = parent.childNodes;
      for (let i = start; i <= end; i++) {
         eles[i].classList.add(cls);
      }
      eles[posIndex].classList.add("preview");
   }
   function removeUserClassUpDown() {
      parent.childNodes.forEach((ele) => {
         ele.classList.remove("up");
         ele.classList.remove("down");
         ele.classList.remove("preview");
      });
   }

   function move(E) {
      if (!isHold) return;

      let e = E,
         ele = E.target;
      if (e.type == "touchmove") {
         e = e.touches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      const eInfo = userEle.parentElement.getBoundingClientRect();
      const userTop = e.clientY - eInfo.top;

      features.forEach((feature) => {
         if (feature == ele) {
            feature.classList.add("hover");
            const computedStyle = window.getComputedStyle(feature);
            const bgColor = computedStyle.getPropertyValue("--color");
            userEle.style.setProperty("--color", bgColor);
         } else {
            feature.classList.remove("hover");
         }
      });

      const is = [...features].some((feature) => {
         if (feature == ele) {
            userEle.classList.add("inFeature");
            const computedStyle = window.getComputedStyle(feature);
            const bgColor = computedStyle.getPropertyValue("--color");
            userEle.style.setProperty("--color", bgColor);
            return true;
         }
      });
      if (!is) resetStyle();

      const scrollDistance = 50;
      const scrollOffset =
         document.documentElement.scrollHeight - window.innerHeight;
      const _d = 5;

      if (window.scrollY > 0 && e.clientY < scrollDistance) {
         window.scrollBy(0, -_d);
      } else if (
         scrollOffset > window.scrollY &&
         e.clientY > window.innerHeight - scrollDistance
      ) {
         window.scrollBy(0, _d);
      }

      userEle.style.top = `${userTop - eInfo.height / 2}px`;
      userOuter.classList.add("active");

      allSec.forEach((sec) => {
         const nodeIndex = getElementIndex(ele);

         if (sec.classList.contains("current") && nodeIndex !== -1) {
            // ascending
            if (userIndex < nodeIndex) {
               setUserClassUpDown(userIndex + 1, nodeIndex, "up", nodeIndex);
            } else {
               // descending
               setUserClassUpDown(nodeIndex, userIndex - 1, "down", nodeIndex);
            }
         } else if (sec.classList.contains("current") && nodeIndex === -1) {
            removeUserClassUpDown();
         }
      });

      allSec.some((sec) => {
         if (!sec.classList.contains("current") && sec == ele) {
            sec.classList.add("preview");
            return true;
         } else {
            sec.classList.remove("preview");
         }
      });
   }

   function holdingStart() {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay / 2);
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

      let e = E,
         ele = E.target;
      if (e.type == "touchend") {
         e = e.changedTouches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      [...features].some((feature) => {
         if (feature == ele) {
            switch (feature) {
               case features[0]:
                  call(values.number);
                  resetStyle();
                  break;
               case features[1]:
                  openInWhatsapp(values.number);
                  resetStyle();
                  break;
               case features[2]:
                  createUserInput(
                     flotingInput,
                     values,
                     (title = "Modify User"),
                     (btnName = "Continue")
                  ).then((newValue) => {
                     if (newValue !== null) {
                        const old = structuredClone(
                           DATA[baseIndex].users[userIndex]
                        );
                        DATA[baseIndex].users[userIndex] = newValue;

                        if (!objectsAreEqual(old, newValue)) {
                           const age =
                              old.age != newValue.age
                                 ? `${old.age} ⇉ ${newValue.age}`
                                 : old.age;
                           const gender =
                              old.gender != newValue.gender
                                 ? `${old.gender} ⇉ ${newValue.gender}`
                                 : old.gender;
                           const location =
                              old.location != newValue.location
                                 ? `${old.location} ⇉ ${newValue.location}`
                                 : old.location;
                           const name =
                              old.name != newValue.name
                                 ? `${old.name} ⇉ ${newValue.name}`
                                 : old.name;
                           const number =
                              old.number != newValue.number
                                 ? `${old.number} ⇉ ${newValue.number}`
                                 : old.number;
                           const work =
                              old.work != newValue.work
                                 ? `${old.work} ⇉ ${newValue.work}`
                                 : old.age;

                           const foramatedUser = {
                              age: age,
                              gender: gender,
                              location: location,
                              name: name,
                              number: number,
                              work: work,
                           };
                           saveHistoryInDB(
                              foramatedUser,
                              DATA[baseIndex].name,
                              "UPDATE USER"
                           );
                           saveLocal();
                        } else {
                           console.log("same");
                        }
                     }
                     resetSection();
                  });
                  break;
               case features[3]:
                  const USER = DATA[baseIndex].users.splice(userIndex, 1);
                  saveHistoryInDB(USER[0], DATA[baseIndex].name, "REMOVE USER");
                  saveLocal();
                  resetSection();
                  break;
            }
            return true;
         }
      });

      // change place in all Section
      allSec.forEach((sec, moveIndex) => {
         const nodeIndex = getElementIndex(ele);

         if (sec.classList.contains("current") && nodeIndex !== -1) {
            const user = DATA[baseIndex].users.splice(userIndex, 1);
            DATA[baseIndex].users.insert(nodeIndex, user[0]);
            saveLocal();
            resetSection();
         } else if (!sec.classList.contains("current") && sec == ele) {
            const user = DATA[baseIndex].users.splice(userIndex, 1);
            DATA[moveIndex].users.unshift(user[0]);
            saveHistoryInDB(
               user[0],
               `${DATA[baseIndex].name} ⇉ ${DATA[moveIndex].name}`,
               "UPDATE USER SECTION"
            );
            saveLocal();
            resetSection();
         } else {
            userEle.style.top = `${0}px`;
         }
         sec.classList.remove("focus");
      });

      isHold = false;
      clearTimeout(holdTimerId);
      userOuter.classList.remove("active");
      parent.parentElement.parentElement.classList.remove("current");
   }

   function copyNumber() {
      const num = number.innerText;
      if (!navigator.clipboard) {
         fallbackCopyTextToClipboard(num);
         return;
      }
      navigator.clipboard.writeText(num).then(
         function () {
            console.log("Copying to clipboard was successful!");
         },
         function (err) {
            console.error("Could not copy text: ", err);
         }
      );
   }

   number.addEventListener("click", copyNumber);

   userOuter.addEventListener("mousedown", holdingStart);
   window.addEventListener("mousemove", move);
   window.addEventListener("mouseup", holdingEnd);

   userOuter.addEventListener("touchstart", holdingStart);
   window.addEventListener("touchmove", move);
   window.addEventListener("touchend", holdingEnd);
}

function createSection(name, active, index, users = []) {
   const sec = CS(itsMain, `sec${active ? " active" : ""}`);
   /**/ const top = CD(sec, "top");
   /*    */ const basic = CD(top, "basic");
   /*    */ const menu = CD(top, "menu-options");
   /*        */ const goUp = CD(menu, "option cursor");
   /*            */ const goUpI = CI(goUp, `sbi-arrow-up1`);
   /*        */ const goDown = CD(menu, "option cursor");
   /*            */ const goDownI = CI(goDown, `sbi-arrow-down1`);
   /*        */ const rename = CD(menu, "option cursor");
   /*            */ const renameI = CI(rename, `sbi-pencil1`);
   /*        */ const duplicate = CD(menu, "option cursor");
   /*            */ const duplicateI = CI(duplicate, `sbi-documents`);
   /*        */ const remove = CD(menu, "option cursor");
   /*            */ const removeI = CI(remove, `sbi-delete_forever`);
   /*        */ const menuBtn = CD(basic, "s-btn cursor");
   /*            */ const menuBtnI = CI(menuBtn, "icon sbi-scatter_plot");
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
      DATA[index].active = !DATA[index].active;
      sec.classList.toggle("active", DATA[index].active);
      saveLocal();
   });

   cUsrBtn.addEventListener("click", async () => {
      createUserInput(flotingInput).then((obj) => {
         if (obj !== null) {
            DATA[index].users.push(obj);
            DATA[index].active = true;
            saveHistoryInDB(obj, DATA[index].name, "ADD USER");
            saveLocal();
            resetSection();
         }
      });
   });

   // holding event handlers
   let isHold = false;
   let holdTimerId;

   function holdingContinue() {
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

      [goUp, goDown, rename, duplicate, remove].some((e) => {
         if (e == ele) {
            switch (ele) {
               case goUp:
                  if (index > 0) {
                     const temp = DATA[index - 1];
                     DATA[index - 1] = DATA[index];
                     DATA[index] = temp;
                     saveLocal();
                     resetSection();
                  }
                  break;
               case goDown:
                  if (index < DATA.length - 1) {
                     const temp = DATA[index + 1];
                     DATA[index + 1] = DATA[index];
                     DATA[index] = temp;
                     saveLocal();
                     resetSection();
                  }
                  break;
               case rename:
                  createSectionInput(
                     flotingInput,
                     "Rename Section",
                     "New Name",
                     "Rename"
                  ).then((val) => {
                     if (val !== null) {
                        DATA[index].name = val;
                        nm.innerHTML = val;
                        saveLocal();
                     }
                  });
                  break;
               case duplicate:
                  const copy = DATA[index];
                  DATA.insert(index, {
                     name: `${copy.name} copy`,
                     active: false,
                     users: [...copy.users].map((user) =>
                        structuredClone(user)
                     ),
                  });
                  addHistoryForRemoveSession(DATA[index], "COPY USER");
                  saveLocal();
                  resetSection();
                  break;
               case remove:
                  const old = DATA.splice(index, 1);
                  addHistoryForRemoveSession(old[0], "REMOVE USER");
                  saveLocal();
                  resetSection();
                  break;
            }
            return true;
         }
      });

      menu.classList.remove("active");
   }

   function holdingStart() {
      isHold = true;
      holdTimerId = setTimeout(() => {
         if (isHold) holdingContinue();
      }, holdDelay);
   }

   function holdingMove(E) {
      if (!isHold) return;
      let e = E,
         ele = e.target;

      if (e.type == "touchmove") {
         e = e.touches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      [goUp, goDown, rename, duplicate, remove].some((e) => {
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

function resetSection() {
   allSec.length = 0;
   itsMain.innerHTML = "";
   DATA.forEach((section, i) => {
      createSection(section.name, section.active, i, section.users);
   });
}

function setHistory() {
   let html = "";
   const historyLen = DATABASE.history.length - 1;
   const start = slideCount * slideSize;
   const end =
      (slideCount + 1) * slideSize < historyLen
         ? (slideCount + 1) * slideSize
         : historyLen;

   for (let i = start; i <= end; i++) {
      html += creatHistoryLog(DATABASE.history[i]);
   }
   historyList.innerHTML = html;
}

function creatHistoryLog(data) {
   const {
      age,
      date,
      gender,
      location,
      name,
      number,
      operation,
      sessinonName,
      work,
   } = data;

   return `
   <div class="h-log">
      <div class="h-span">
         <div class="c-feb">${date}</div>
         <div class="c-green">${operation}</div>
         <div class="c-red">${sessinonName}</div>NAME ▶ 
         <div class="c-cor1">${name}</div> NUMBER ▶
         <div class="c-cor1">${number}</div>AGE ▶ 
         <div class="c-cor1">${age}</div>GENDER ▶ 
         <div class="c-cor1">${gender}</div>WORK ▶ 
         <div class="c-cor1">${work}</div>LOCATION ▶ 
         <div class="c-cor1">${location}</div>
      </div>
   </div>
   `;
}
