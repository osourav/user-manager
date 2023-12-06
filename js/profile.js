let p_card,
   p_index,
   p_sec_name,
   p_name,
   p_number,
   p_gender,
   p_work,
   p_age,
   p_location;

(() => {
   const id = Date.now();

   profileView.innerHTML = `
   <div class="card" id="card${id}">
      <div class="card-content">
         <div class="head">
            <div class="biger">
               <div class="index" id="index${id}">10</div>
               <div class="sec-nanme" id="sec-name${id}">Day 1</div>
            </div>
         </div>
         <div class="detail">
            <i class="sbi-user1"></i>
            <p class="copy" id="name${id}">User Name</p>
         </div>
         <div class="detail">
            <i class="sbi-phone1"></i>
            <p class="copy" id="number${id}">8250032643</p>
         </div>
         <div class="detail">
            <i class="sbi-transgender-alt"></i>
            <p id="gender${id}">Male</p>
         </div>
         <div class="detail">
            <i class="sbi-work"></i>
            <p id="work${id}">Student</p>
         </div>
         <div class="detail">
            <i class="sbi-height"></i>
            <p id="age${id}">22+</p>
         </div>
         <div class="detail">
            <i class="sbi-location1"></i>
            <p class="copy" id="location${id}">Kolkata</p>
         </div>
         <div id="footer">
            <div class="feature f${id} cursor">
               <i class="sbi-phone"></i>
            </div>
            <div class="feature f${id} cursor">
               <i class="sbi-whatsapp"></i>
            </div>
         </div>
      </div>
   </div>`;

   p_card = document.getElementById(`card${id}`);
   p_index = document.getElementById(`index${id}`);
   p_sec_name = document.getElementById(`sec-name${id}`);
   p_name = document.getElementById(`name${id}`);
   p_number = document.getElementById(`number${id}`);
   p_gender = document.getElementById(`gender${id}`);
   p_work = document.getElementById(`work${id}`);
   p_age = document.getElementById(`age${id}`);
   p_location = document.getElementById(`location${id}`);
   const features = document.querySelectorAll(`.f${id}`);

   const start = (e) => {
      features.forEach((feature) => {
         if (e.target == feature) feature.classList.add("hover");
      });
   };

   const end = () => {
      features.forEach((feature) => feature.classList.remove("hover"));
   }

   let isSectionOuter = false;
   p_card.addEventListener("click", () => (isSectionOuter = true), true);
   profileView.addEventListener("click", () => {
      if (!isSectionOuter) profileView.classList.remove("active");
      isSectionOuter = false;
   });

   p_name.addEventListener("click", () => copyText(p_name.innerText));
   p_number.addEventListener("click", () => copyText(p_number.innerText));
   p_location.addEventListener("click", () => copyText(p_location.innerText));

   features[0].addEventListener("click", () => {
      call(p_number.innerText);
   });
   features[1].addEventListener("click", () => {
      openInWhatsapp(p_number.innerText);
   });

   features.forEach((feature) => {
      feature.addEventListener("mousemove", start);
      feature.addEventListener("touchstart", start);
   });
   features.forEach((feature) => {
      feature.addEventListener("mouseleave", end);
      feature.addEventListener("touchend", end);
   });

})();

function showProfile(sectionName, userDetails, index) {
   profileView.classList.add("active");
   const { age, gender, location, name, number, work } = userDetails;

   let gen = gender == "M" ? "Male" : gender == "F" ? "Female" : "Others";

   p_index.innerText = index;
   p_sec_name.innerText = sectionName;
   p_name.innerText = name;
   p_number.innerText = number;
   p_gender.innerText = gen;
   p_work.innerText = work;
   p_age.innerText = age;
   p_location.innerText = location;
}
