// Pubali Maity 7478103293 F Student 19 Kolkata

const holdDelay = 500; 

const dataBase = [
   {
      name: "Section 1",
      active: true,
      users: [
         {
            name: "Shikha Barui",
            number: "7478103293",
            gender: "F",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
      ],
   },
   {
      name: "Section 2",
      active: true,
      users: [
         {
            name: "Subrata Barui",
            number: "7478103293",
            gender: "F",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
         {
            name: "Sukumar Barui",
            number: "8250032643",
            gender: "M",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
         {
            name: "Subrata Barui",
            number: "7478103293",
            gender: "F",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
         {
            name: "Sukumar Barui",
            number: "8250032643",
            gender: "M",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
      ],
   },
   {
      name: "Section 3",
      active: true,
      users: [
         {
            name: "Pubali Maity",
            number: "7478103293",
            gender: "F",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
         {
            name: "Sourav Barui",
            number: "8250032643",
            gender: "M",
            work: "Student",
            age: "18-22",
            location: "Kolkata",
         },
      ],
   },
];

// array insert function add in array prototype
Array.prototype.insert = function(index, ...items ) {
   this.splice(index, 0, ...items );
};

function getFormatInput(text) {
   const values = text.split(" ");

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
   window.location.href = `whatsapp://send?phone=${number}&text=Hi`;
}

