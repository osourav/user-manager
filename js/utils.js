// array insert function add in array prototype
Array.prototype.insert = function (index, ...items) {
   this.splice(index, 0, ...items);
};

const b64toString = (b64) => btoa(b64);
const stringToB64 = (b64) => atob(b64);

function getFormatInput(text) {
   const values = text.split(" ");
   if (values.length < 6) return null;

   try {
      let name = [];

      for (let i = 0; i < values.length; i++) {
         if (
            !isNaN(values[i + 1][0]) ||
            values[i + 1].toLowerCase() == "yes" ||
            values[i + 1].toLowerCase() == "no"
         ) {
            name.push(values.shift());
            i--;
            break;
         } else {
            name.push(values.shift());
            i--;
         }
      }

      // format name
      name = name.map(n => {
         if (n.length <= 2) return n.toUpperCase();
         return n[0].toUpperCase() + n.substring(1, n.length).toLowerCase();
      })

      name = name.join(" ");

      let age = `${values.shift()}`;
      age = !isNaN(age[0]) ? age + "+" : age == "no" ? "18-" : "18+";
      const gender = `${values.shift().toLowerCase()}`;
      const work = `${values.shift()} ${
         isNaN(values[0][0]) ? values.shift() : ""
      }`;
      const number = `${values.shift()}`;
      const location = `${values.join(" ")}`;

      return {
         name: name,
         number: number,
         genIndx: gender[0] == "m" ? 0 : gender[0] == "f" ? 1 : 2,
         work: work,
         age: age,
         location: location,
      };
   } catch (error) {
      console.log(error);
      return null;
   }
}

function copyText(text) {
   if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
   }
   navigator.clipboard.writeText(text).then(
      () => {
         console.log("Copying to clipboard");
      },
      (err) => {
         console.error("Could not copy text: ", err);
      }
   );
}

function getFormatText(text, len = Infinity, end = false) {
   let str = "";
   const length = text.length < len ? text.length : len;
   for (let i = 0; i < length; i++) str += text[i];
   return text.length > len && end ? str + ".." : str;
}

function objectsAreEqual(obj1, obj2) {
   const keys = Object.keys(obj1);
   for (const key of keys) {
      if (obj1[key] !== obj2[key]) {
         return false;
      }
   }
   return true;
}

// create element

// create div
function CD(parent, classes = "", id = "", innerHTML = "") {
   const ele = document.createElement("div");
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });
   if (id) ele.setAttribute("id", id);
   ele.innerHTML = innerHTML;
   parent.appendChild(ele);
   return ele;
}

// create section
function CS(parent, classes = "", id = "", innerHTML = "") {
   const ele = document.createElement("section");
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });
   if (id) ele.setAttribute("id", id);
   ele.innerHTML = innerHTML;
   parent.appendChild(ele);
   return ele;
}

// create i
function CI(parent, classes = "", id = "") {
   const ele = document.createElement("i");
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });

   if (id) ele.setAttribute("id", id);
   parent.appendChild(ele);
   return ele;
}

// create p
function CP(parent, classes = "", id = "", innerHTML = "") {
   const ele = document.createElement("p");
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });
   if (id) ele.setAttribute("id", id);
   ele.innerHTML = innerHTML;
   parent.appendChild(ele);
   return ele;
}

// create button
function CB(parent, classes = "", id = "", innerHTML = "") {
   const ele = document.createElement("button");
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });

   if (id) ele.setAttribute("id", id);
   ele.innerHTML = innerHTML;
   parent.appendChild(ele);
   return ele;
}

// create input
function CIN(parent, classes = "", id = "", innerHTML = "") {
   const ele = document.createElement("input");
   ele.type = "text";
   const cless = classes.split(" ");
   if (classes)
      cless.forEach((cls) => {
         ele.classList.add(cls);
      });

   if (id) ele.setAttribute("id", id);
   ele.innerHTML = innerHTML;
   parent.appendChild(ele);
   return ele;
}

function call(number) {
   window.location.href = `tel:${number}`;
}
function openInWhatsapp(number) {
   window.location.href = `whatsapp://send?phone=${number}&text=`;
}
