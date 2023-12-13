function createUser(parent, values, baseIndex, userIndex, sectionName) {
   const userOuter = CD(parent, "user-outer cursor");
   const userEle = CD(userOuter, "user", "");

   const nm = getFormatText(values.name, 25, true);
   const nu = values.number;

   /**/ CP(userEle, "center no", "", userIndex + 1);
   /**/ const nmdt = CD(userEle, "name-date");
   /*   */ CP(nmdt, "name", "", nm);
   /*   */ CP(nmdt, "date", "", values.date || "");
   /**/ const number = CP(userEle, "number copy", "", nu);
   /**/ CP(userEle, "center small", "", values.gender);
   /**/ CP(userEle, "center small", "", getFormatText(values.age, 3));

   const features =
      parent.parentElement.parentElement.querySelectorAll(".feature");
   let isHold = false;
   let isHolding = false;
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
   
   let isY = 0;
   let isOY = 0;
   const thresHold = 5;

   function move(E) {
      
      let e = E,
      ele = E.target;
      if (e.type == "touchmove") {
         e = e.touches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }
      isY = e.clientY;
      if (!isHolding) return;

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

      const scrollDistance = 20;
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
            allSec.forEach((sec) => {
               if (sec.classList.contains("current")) {
                  sec.classList.add("active");
                  sec.classList.add("gone");
               } else {
                  sec.classList.remove("active");
               }
            });
            return true;
         } else {
            sec.classList.remove("preview");
         }
      });
   }

   function holdingStart(E) {
      let e = E;
      if (e.type == "touchstart")e = e.touches[0];
      isOY = isY = e.clientY;
      isHold = true;

      holdTimerId = setTimeout(() => {
         if (isOY < isY + thresHold && isOY > isY - thresHold) {
            lastScroll = window.scrollY;
            document.body.classList.add("removeScroll");
            isHolding = true;
            holdingContinue();
         } else {
            isHold = false;
         }
      }, holdDelay);
   }

   function holdingContinue() {
      parent.parentElement.parentElement.classList.add("current");
      allSec.forEach((sec) => {
         sec.classList.add("focus");
      });
   }

   function holdingEnd(E) {
      if (!isHold) return;
      document.body.classList.remove("removeScroll");
      let e = E,
         ele = E.target;
      if (e.type == "touchend") {
         e = e.changedTouches[0];
         ele = document.elementFromPoint(e.clientX, e.clientY);
      }

      allSec.forEach((sec) => sec.classList.remove("gone"));

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
                  createAddUserInput(
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
         sec.classList.toggle("active", DATA[moveIndex].active);
      });

      if (isHolding) {
         window.scroll(0, lastScroll);
      }

      isHold = false;
      isHolding = false;
      clearTimeout(holdTimerId);
      userOuter.classList.remove("active");
      parent.parentElement.parentElement.classList.remove("current");
   }

   function copyNumber() {
      const num = number.innerText;
      copyText(num);
   }

   number.addEventListener("click", copyNumber);
   userOuter.addEventListener("click", () => {
      showProfile(sectionName, values, userIndex + 1);
   });

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
   /*            */ CI(goUp, `sbi-arrow-up1`);
   /*        */ const goDown = CD(menu, "option cursor");
   /*            */ CI(goDown, `sbi-arrow-down1`);
   /*        */ const rename = CD(menu, "option cursor");
   /*            */ CI(rename, `sbi-pencil1`);
   /*        */ const duplicate = CD(menu, "option cursor");
   /*            */ CI(duplicate, `sbi-documents`);
   /*        */ const remove = CD(menu, "option cursor");
   /*            */ CI(remove, `sbi-delete_forever`);
   /*        */ const menuBtn = CD(basic, "s-btn cursor");
   /*            */ CI(menuBtn, "icon sbi-scatter_plot");
   /*        */ const nm = CD(basic, "name", "", name);
   /*    */ const features = CD(top, "features");
   /*        */ const fCall = CD(features, "feature call cursor");
   /*            */ CI(fCall, "sbi-phone");
   /*        */ const fWP = CD(features, "feature whatsapp cursor");
   /*            */ CI(fWP, "sbi-whatsapp");
   /*        */ const fEdit = CD(features, "feature edit cursor");
   /*            */ CI(fEdit, "sbi-pencil1");
   /*        */ const fDelete = CD(features, "feature delete cursor");
   /*            */ CI(fDelete, "sbi-delete");
   /*        */ const cMulUsrBtn = CD(basic, "s-btn cursor");
   /*            */ CI(cMulUsrBtn, "sbi-group_add");
   /*        */ const cUsrBtn = CD(basic, "s-btn cursor");
   /*            */ CI(cUsrBtn, "icon add mid sbi-person_add");
   /*        */ const tglBtn = CD(basic, "toggle-btn s-btn cursor");
   /*            */ CI(tglBtn, "icon big sbi-remove1");
   /*            */ CI(tglBtn, "icon big sbi-keyboard_arrow_down");
   /**/ const inner = CD(sec, "inner-sec");
   /*    */ const tags = CD(inner, "tags");
   /*        */ CD(tags, "nmae", "", "No");
   /*        */ CD(tags, "nmae", "", "Name");
   /*        */ CD(tags, "phone", "", "Mobile No");
   /*        */ CD(tags, "center gender", "", "Gn");
   /*        */ CD(tags, "center age", "", "Age");
   /*    */ const userList = CD(inner, "user-list");

   allSec.push(sec);

   users.forEach((user, i) => {
      createUser(userList, user, index, i, name);
   });

   tglBtn.addEventListener("click", () => {
      DATA[index].active = !DATA[index].active;
      sec.classList.toggle("active", DATA[index].active);
      saveLocal();
   });

   cUsrBtn.addEventListener("click", async () => {
      createAddUserInput(flotingInput).then((obj) => {
         if (obj !== null) {
            DATA[index].users.push(obj);
            DATA[index].active = true;
            saveHistoryInDB(obj, DATA[index].name, "ADD USER");
            saveLocal();
            resetSection();
         }
      });
   });

   cMulUsrBtn.addEventListener("click", () => {
      createMultiAddUserInput(flotingInput).then((obj) => {
         if (obj !== null) {
            DATA[index].active = true;
            obj.users.forEach((user) => {
               const { age, date, genIndx, location, name, number, work } = user;
               const nObj = {
                  age: age,
                  date: date,
                  gender: genIndx,
                  location: location,
                  name: name,
                  number: number,
                  work: work
               }
               DATA[index].users.push(nObj);
               saveHistoryInDB(nObj, DATA[index].name, "ADD USER");
            });
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
                     name,
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

      document.body.classList.remove("removeScroll");
      menu.classList.remove("active");
   }

   function holdingStart() {
      isHold = true;
      holdTimerId = setTimeout(() => {
         document.body.classList.add("removeScroll");
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
         <div class="c-cor1 copy-number">${number}</div>AGE ▶ 
         <div class="c-cor1">${age}</div>GENDER ▶ 
         <div class="c-cor1">${gender}</div>WORK ▶ 
         <div class="c-cor1">${work}</div>LOCATION ▶ 
         <div class="c-cor1">${location}</div>
      </div>
   </div>
   `;
}
