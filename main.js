/*****************************************************************************/


/* start import all firebase methods filles from firebase js*/
import {firebaseConfig,initializeApp ,getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt  } from "./firebase.js";


firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = firebase.storage();
let X;




/*1*/


/* start get user doc */
let docId=localStorage.getItem("notes-online-id");
if(docId!==null&&docId!==''&&docId!==undefined){ 
  // console.log(docId)
} else {
  location.href="./login/login.html"
};


var mainData;

await getDoc(doc(db, "accounts", docId)).then(e=>{

  mainData = e.data();

  console.log(mainData);
  if(mainData.arrayOfNotes!==undefined){
    console.log(mainData.arrayOfNotes);
  };

  // let H = e.data().N;
  
  // if (H!=""){
  //   noon.innerHTML= H;
  // }

  document.querySelector(".NameOfPerson").textContent=`Hello ${mainData.username}`

  
});


/* end get user doc */


async function getMainData(){
  await getDoc(doc(db, "accounts", docId)).then(e=>{
    mainData = e.data()
  });
  return mainData;
};



/*3*/
async function uploadImage() {

  const ref = firebase.storage().ref();
  const file = document.querySelector("#in2").files[0];
  const name = +new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type
  };

  const task = ref.child(name).put(file, metadata);
  await task
  .then(async snapshot => snapshot.ref.getDownloadURL())
  .then(async url => {
    mainImgSrc = url
  })
  .catch(console.error);
  
  return mainImgSrc;
};
/*3*/





/*****************************************************************************/

























// setting

let settings = document.querySelector('#settings')

let settingDone = document.querySelector('#setting-done')

let settingPage = document.querySelector('#setting-page')

function showSett() {
  
  settingPage.style.display='block'
  
}

function hideSett() {
  showAllNotes(ArrayOfAllNotes);
  settingPage.style.display = 'none';
};








var request = indexedDB.open("myDatabase", 1);


request.onupgradeneeded = function(e) {
  var db = e.target.result;
  var objectStore = db.createObjectStore("data", { keyPath: "id" }); 
};

async function saveData(ArrayOfAllNotes) {



  /* start save data in firebase */

  await setDoc(doc(db, "accounts", `${mainData.id}`), {
    ...mainData,
    ArrayOfAllNotes: ArrayOfAllNotes,
  });

 /* end save data in firebase */





  // let data = { id: 1, ArrayOfAllNotes: ArrayOfAllNotes }
  // var request = indexedDB.open("myDatabase", 1);

  // request.onupgradeneeded = function(e) {
  //   var db = e.target.result;
  //   var objectStore = db.createObjectStore("data", { keyPath: "id" }); 
  // };

  // request.onsuccess = function(e) {
  //   var db = e.target.result;
  //   var transaction = db.transaction(["data"], "readwrite");    
  //   var store = transaction.objectStore("data");  
  //   store.put(data);  
  // };



};


let objectFromDb=[];

async function getData() {

  getMainData().then(el=>{
    return el;
  });



  // return new Promise((resolve, reject) => {
  //   request.onsuccess = async (e) => {
  //     try {
  //       const db = e.target.result;
  //       const transaction = await db.transaction(["data"], "readonly");
  //       const store = await transaction.objectStore("data");
  //       const x = await store.getAll();

  //       x.onsuccess = (e) => {
  //         const objectFromDb = e.target.result;
  //         console.log(objectFromDb);
  //         if(objectFromDb[0]!==undefined){
  //           resolve(objectFromDb[0].ArrayOfAllNotes||[]);
  //         } else {
  //           resolve([]);
  //         }
  //       };
  //     } catch (error) {
  //       reject(error);
  //     }
  //   };
  // });


  return mainData.ArrayOfAllNotes;
};



////////////////////////////////////////////////////////////////////////////
















let int = document.querySelector('#in');
let btn1 = document.querySelector('#btn1');
let noon = document.querySelector('#noon');
let mainImgSrc="";

let src='';


mainImgSrc="";


let AllSettingBtns=JSON.parse(localStorage.getItem("AllSettingBtns"))||{
  date: true,
  bigText: true,
  img: true,
  toDo: true,
  copy: true,
  edit: true,
  delet: true,
};



function isOk(btnName){
  let isOk = "block";

  if(AllSettingBtns[btnName]==true||AllSettingBtns[btnName]=="true"){
    isOk = "block";
  } else{
    isOk = "none";
  };

  if(btnName=="img"&&AllSettingBtns[btnName]==true){
    isOk = "flex";
  }else if(btnName=="img"&&AllSettingBtns[btnName]==false){
    isOk = "none";
  };

  return isOk;
};


document.querySelector("#lab").style.display=`${isOk("img")}`;
document.querySelector("#btn2").style.display=`${isOk("bigText")}`;

let ArrayOfAllNotes=[];
// start get ArrayOfAllNotes from DB to show 

let ArrayOfAllNotesFromDB=[];

await getData().then(value => {

  ArrayOfAllNotesFromDB=value;

  if(ArrayOfAllNotesFromDB==`undefined`||ArrayOfAllNotesFromDB==undefined||ArrayOfAllNotesFromDB==null){
    ArrayOfAllNotes = [];
  } else {
    ArrayOfAllNotes = ArrayOfAllNotesFromDB||[];
    showAllNotes(ArrayOfAllNotes);
  };

});


// end get ArrayOfAllNotes from local storge to show 


// start function to show all notes

function showAllNotes(ArrayOfAllNotes){
  


  if(ArrayOfAllNotes==null||Array.isArray(ArrayOfAllNotes)==false){
    ArrayOfAllNotes=[];
  };

  if(ArrayOfAllNotes!==null&&ArrayOfAllNotes.length!==0&&Array.isArray(ArrayOfAllNotes)==true){

    ArrayOfAllNotes.sort((b, a) => a.sortByThis - b.sortByThis);
    let mainDiv = document.querySelector("#noon");
    mainDiv.innerHTML=``;
    ArrayOfAllNotes.forEach((e)=>{
  
      if(true){
  
        mainDiv.innerHTML+=`
        <div id="d1">
          
          <p style="display: ${e.text==""?`none`:`block`};" dir="auto" id="text">${e.text}</p>
          
          ${(e.imgSrc==""||e.imgSrc==undefined)?``:`
          <br>
          <img style="margin-top: ${e.text==""?`10px`:`-30px`};" src="${e.imgSrc}" id="img0">
          `}
          <button style="display: ${isOk(`delet`)}" id="clear" class="removeNote dd" data-id="${e.id}" data-img="${e.imgSrc}"></button>
          <div>
            <button data-id="${e.id}" style="background: ${e.isDone==false?`transparent`:`url(img/toDo.jpg) 0% 0% / cover`}; display: ${isOk(`toDo`)};" class="isDoneBtnForNote"></button>
          </div>
          <p style="display: ${isOk(`date`)}" id="date">${e.date}</p>
          <div id="btn-copy" style="display: ${isOk(`copy`)}">
            <span class="copyNoteText" data-id="${e.id}">Copy</span>
          </div>
          <div id="btn-edit" style="display: ${isOk(`edit`)}">
            <span class="noteEdit" data-id="${e.id}">Edit</span>
          </div>
        </div>
        `;
  
      };
  
    });
  };
};

// end function to show all notes


function save(ArrayOfAllNotes){

  saveData(ArrayOfAllNotes);

};


document.querySelectorAll(".settingBtn").forEach((e)=>{
  
  e.dataset.value=AllSettingBtns[e.dataset.btn];

  if(e.dataset.value==true||e.dataset.value=="true"){

    e.style=`background: url(./img/gu.svg); background-size: cover;`;
    
  } else {

    e.style=`background: white !important;`;
    
  };

});





window.onclick=async (e)=>{



  if([...e.target.classList].includes("LogOut")){
    localStorage.setItem("notes-online-id","");
    location.href="./login/login.html";
  };




  if([...e.target.classList].includes("settingsPageBtnShow")){
    showSett();
  };

  if([...e.target.classList].includes("settingsPageBtnHidde")){
    hideSett();
  };


  if([...e.target.classList].includes("bigTextBtn")){

    let oldText = document.querySelector("#in").value;
    let { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Enter The Text..',
      inputValue: `${oldText}`,
      inputAttributes: {
        'aria-label': 'Type your note here',
        'dir': "auto",
      },
      showCancelButton: true
    })
    
    if(text) {

   

      if(text.trim()!==""){

        document.querySelector("#in").value=text.trim();
        
      } else{
        Swal.fire('Enter Valid Text!', '', 'error');
      };


    };

  };




  if([...e.target.classList].includes("importAllNotesJson")){

    let { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Put The Json',
      inputValue: ``,
      inputAttributes: {
        'aria-label': 'Put The Json here'
      },
      showCancelButton: true
    })
    
    if (text) {
      

      let pattern = /^\s*(\{|\[)([\s\S]*)(\}|\])\s*$/;

      let isValidJSON = pattern.test(text);

      

      if(isValidJSON==true){

        ArrayOfAllNotes=[...JSON.parse(text),...ArrayOfAllNotes];
       
        save(ArrayOfAllNotes);
        Swal.fire('Done!', '', 'success');
      } else{
        Swal.fire('Enter Valid Json!', '', 'error');
      };


    };

  };


  if([...e.target.classList].includes("exportAllNotesJson")){

    let text=ArrayOfAllNotes;
    
  
    // text = text.filter(e=>e.imgSrc=="");
    text = JSON.stringify(text)
  
    let x = document.createElement('textarea');
    x.value=text;
    document.body.appendChild(x)
    x.select()
    x.setSelectionRange(0,99999);
    document.execCommand("copy");
    document.body.removeChild(x);

    Swal.fire("تم النسخ","","success");
  };




  if([...e.target.classList].includes("settingBtn")){
    
    let btn = e.target.dataset.btn;
    let btnValue = e.target.dataset.value;


    if(btnValue==true||btnValue=="true"){

      e.target.dataset.value=false;
      AllSettingBtns[btn]=false;
      e.target.style=`background: white !important;`;
      localStorage.setItem("AllSettingBtns",JSON.stringify(AllSettingBtns));

    } else {

      e.target.dataset.value=true;
      AllSettingBtns[btn]=true;
      e.target.style=`background: url(./img/gu.svg); background-size: cover;`;
      localStorage.setItem("AllSettingBtns",JSON.stringify(AllSettingBtns));

    };


    document.querySelector("#lab").style.display=`${isOk("img")}`;
    document.querySelector("#btn2").style.display=`${isOk("bigText")}`;
  
  };













  if([...e.target.classList].includes("copyNoteText")){

    let noteId=e.target.dataset.id;
    let NoteDate=ArrayOfAllNotes.find(e=>e.id==noteId);
    let foundNoteIndex = ArrayOfAllNotes.findIndex(note => note.id === noteId);

    let x = document.createElement('textarea');
    x.value=NoteDate.text;
    document.body.appendChild(x)
    x.select()
    x.setSelectionRange(0,99999);
    document.execCommand("copy");
    document.body.removeChild(x);

    Swal.fire("تم النسخ","","success");

  };

  if([...e.target.classList].includes("noteEdit")){

    let noteId=e.target.dataset.id;
    let NoteDate=ArrayOfAllNotes.find(e=>e.id==noteId);
    let foundNoteIndex = ArrayOfAllNotes.findIndex(note => note.id === noteId);


    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Edit It',
      inputValue: `${NoteDate.text}`,
      inputAttributes: {
        'aria-label': 'Type your message here',
        'dir': "auto",
      },
      showCancelButton: true
    })
    
    if (text) {
      NoteDate.text=text;
      if (foundNoteIndex !== -1) {
        ArrayOfAllNotes[foundNoteIndex].text = text;
      };
      save(ArrayOfAllNotes);
      showAllNotes(ArrayOfAllNotes);
      Swal.fire('Done!', '', 'success');
    }

  };

  if([...e.target.classList].includes("removeNote")){

    let noteId=e.target.dataset.id;

    console.log(e.target.dataset.img);

    let imgLinkToDelet = e.target.dataset.img;


    Swal.fire({
      html: `<h2>Do you want to delet it?</h2>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      
      if (result.isConfirmed) {

        if(imgLinkToDelet=="x"){

          let firebaseStorageUrl = imgLinkToDelet
          let startIndex = firebaseStorageUrl.indexOf('o/') + 2;
          let endIndex = firebaseStorageUrl.indexOf('?alt=media');
          let filePathAndName = firebaseStorageUrl.substring(startIndex, endIndex);
          let fileName = decodeURIComponent(filePathAndName);
      
      
          var imageRef = storage.ref().child(fileName);
          // Delete the file
          imageRef.delete().then(function() {
            ArrayOfAllNotes=ArrayOfAllNotes.filter(e=>e.id!=noteId);
            e.target.parentNode.remove();
            save(ArrayOfAllNotes);
            Swal.fire('Done!', '', 'success');    
          }).catch(function(error) {
            console.log("error")
          });

        } else{

          ArrayOfAllNotes=ArrayOfAllNotes.filter(e=>e.id!=noteId);
          e.target.parentNode.remove();
          save(ArrayOfAllNotes);
          Swal.fire('Done!', '', 'success');
  
        };
        

      };
    });

  };


  if([...e.target.classList].includes("isDoneBtnForNote")){

    let noteId=e.target.dataset.id;
    let NoteDate=ArrayOfAllNotes.find(e=>e.id==noteId);
    let foundNoteIndex = ArrayOfAllNotes.findIndex(note => note.id === noteId);
    if(NoteDate.isDone == false){

      e.target.style = `
      background: url(img/toDo.jpg);
      background-size: cover;
      `;

      NoteDate.isDone=true;
      if (foundNoteIndex !== -1) {
        ArrayOfAllNotes[foundNoteIndex].isDone = true;
      };
      save(ArrayOfAllNotes);
      
    }else if(NoteDate.isDone == true){

      e.target.style = `
      background: transpernt;
      background-size: cover;
      `;

      NoteDate.isDone=false;
      if (foundNoteIndex !== -1) {
        ArrayOfAllNotes[foundNoteIndex].isDone = false;
      };
      save(ArrayOfAllNotes);
      
    };
  };

};










async function setInLocalStorage(keyName, value){
  try {
    localStorage.setItem(keyName, JSON.stringify(value));
  } catch (error) {
    console.log('Error in local storage', error);
    setInLocalStorage(keyName, JSON.parse(localStorage.getItem(keyName)));
  }
};











//btn for add note and save in local storage
btn1.onclick=async()=>{
  
  let text=document.querySelector("#in").value;
  
  src = mainImgSrc;
  


  if(isAnImgHere==true){
    console.log("yes");

    Swal.fire({
      title: 'Please Wait!',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    await uploadImage().then(ele=>{
      src = ele;
      console.log(src);
    });

    isAnImgHere=false;
  }else{
    isAnImgHere=false;
  };

  if(ArrayOfAllNotes==null||Array.isArray(ArrayOfAllNotes)==false){
    ArrayOfAllNotes=[];
  };


  if(text.trim()!==""||src.trim()!==""){

    ArrayOfAllNotes.push({
      id: Date.now(),
      text: text.trim()||"",
      imgSrc: src.trim()||"",
      date: returnDate(),
      sortByThis: Date.now(),
      isDone: false,
    });
  

    save(ArrayOfAllNotes);
    showAllNotes(ArrayOfAllNotes);



    
    Swal.fire("Done","","success");


    int.value="";
    // localStorage.setItem("imgSrc", "");
    mainImgSrc="";
    let imgLabel= document.querySelector("#lab");
    imgLabel.style.background=`white`;
    imgLabel.style.color=`var(--main-color)`;
    imgLabel.style.fontWeight=`bold`;
    
  };

};






//btn for scroll

let btnup = document.getElementById('btnup')

window.onscroll = function() {
  if (window.scrollY >= 200) {
    btnup.style.display = "flex";
  } else {
    btnup.style.display = "none";
  }
};


btnup.onclick = function() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  })
}


//end button for scroll




let isAnImgHere=false;

// save img src in local storge

document.querySelector("#in2").addEventListener("change", function () {


  isAnImgHere=true;
  // const reader = new FileReader();
  
  // reader.addEventListener("load", () => {
  //   mainImgSrc=reader.result;
  // });
  
  // reader.readAsDataURL(this.files[0]);

  isInputHasImg();
})

//end save src in local storge









// change color for label for btn select img

let lab = document.querySelector('#lab')

function isInputHasImg() {
  
  if (in2.value !== '') {
    lab.style.background = '#D62828'
    lab.style.color='white'
    
  };
  
};

isInputHasImg();

//end change color










//show data and time
function showDate(){
  
  const d = new Date();
  
  
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let mint = d.getMinutes();
  
  
  if(mint<10){
    mint=`0${mint}`
  }
  
  if (hour>12){
    
    document.querySelector('#date').innerHTML = `
      ${year}/${month+1}/${day}
      => ${hour-12}:${mint} PM
      `;
    
  } else if (hour<=12){
    
    document.querySelector('#date').innerHTML = `
  
  ${year}/${month+1}/${day}
  => ${hour}:${mint} AM
  
  `;
  }
  
}
//end show data and time





//start function to return data and time
function returnDate(){
  let returnedDate;
  const d = new Date();
  
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let mint = d.getMinutes();
  
  
  if(mint<10){
    mint=`0${mint}`
  };

  if (hour>12){
    
    returnedDate = `
      
    ${year}/${month+1}/${day} => ${hour-12}:${mint} PM

    `;
    
  } else if (hour<=12){
    
    returnedDate = `
  
    ${year}/${month+1}/${day} => ${hour}:${mint} AM
    
    `;
  };

  returnedDate = returnedDate.trim();

  return returnedDate;
};
//end function to return data and time


//edit function


///////*start  enter*/////////

document.querySelector("#in").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("#btn1").click();
  }
});

///////*end  enter*/////////

