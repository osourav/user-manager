
// array insert function add in array prototype
Array.prototype.insert = function(index, ...items ) {
   this.splice(index, 0, ...items );
};

const b64toString = b64 => btoa(b64);
const stringToB64 = b64 => atob(b64);

function getFormatInput(text) {
   const values = text.split(" ");
   if (values.length < 6) return null;

   const name = `${values.shift()} ${
      isNaN(values[0][0]) ? values.shift() : ""
   }`;
   const age = `${values.shift()}`;
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
      age: age.length > 1 ? age.slice(0, 5) : age,
      location: location,
   };
}

function getFormatText(text, len = Infinity, end = false) {
   let str = "";
   const length = text.length < len ? text.length : len;
   for (let i = 0; i < length; i++) str += text[i];
   return text.length > len && end ? str + ".." : str;
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

