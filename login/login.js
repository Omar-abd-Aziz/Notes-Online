
/* start custom function */
function $(e) {
    return document.querySelector(e)
}

function $all(e) {
    return document.querySelector(e)
}

function cs(e) {
    return console.log(e)
}
/* end custom function */









/////* start firebase */////



/*1*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getFirestore, collection, getDocs,getDoc, setDoc, addDoc, doc } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAespwTz2x171jNo77nv7HNzy4D_xqmnKs",
    authDomain: "bookland-ed2c4.firebaseapp.com",
    projectId: "bookland-ed2c4",
    storageBucket: "bookland-ed2c4.appspot.com",
    messagingSenderId: "583743657561",
    appId: "1:583743657561:web:f25c6fb76f2c979cf38348",
    measurementId: "G-8R93J4WL6S"
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let X;

async function getCit(db,X) {
  const citiesCol = collection(db,`${X}`);
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
/*1*/



/* start set id on all docs */
function setIdForAllDoc(){
    getDocs(collection(db,"accounts")).then(snap=>{
        snap.docs.forEach(el=>{
            setDoc(doc(db,"accounts",el.id), {
                ...el.data(),
                id: el.id,
            })
        })
        getCards()
    })
}
setIdForAllDoc()
/* end set id on all docs */




/* start get accounts */
let AllAccounts;
function getCards() {
    getCit(db, 'accounts').then(async (e) => {
        AllAccounts = e;
    })
}
/* end get accounts */



/*Start Sing In*/


$(".btn-sign-in").addEventListener("click",()=>{
    var username = $(".username-in").value
    var password = $(".password-in").value
    var numOfFalse=0
    if (username!=""&&password!="") {
        AllAccounts.forEach(e=>{
            numOfFalse++;
            if(username==e.username&&password==e.password) {
                $(".username-in").value=""
                $(".password-in").value=""
                /**/
                localStorage.setItem("doc-id",e.id)
                /**/
                numOfFalse="true"
                location.href="../index.html"
            }

            if (numOfFalse>=AllAccounts.length){
                Swal.fire("","Usename Or Password Are Wrong");
            } else if(numOfFalse=="true"){
                location.href="../index.html"
            }

        })
    } else {Swal.fire("","Enter Usename And Password")}

})

/*End Sing In*/


/////* end firebase */////






/* start create account */

$(".btn-sign-up").addEventListener("click",()=>{
    var username = $(".username-up").value
    var password = $(".password-up").value
    var password2 = $(".password-up-2").value
    var email = $(".email-up").value


    

    if(username!=""&&password!=""&&password2!=""&&email!=""&&password==password2)
    {

      addDoc(collection(db,"accounts"),{
        username: username,
        password: password,
        email: email,
        time: Date.now(),
        N:"",
      });
  
      setIdForAllDoc()

      $(".username-up").value=""
      $(".password-up").value=""
      $(".email-up").value=""
      $(".password-up-2").value=""

      /**/
      Swal.fire(
        'تم انشاء الحساب',
        'يمكنك الان تسجيل الدخول',
        'success'
      )
      /**/

      $("#tab-1").click()

    } else if(username!=""&&password!=password2&&email!="") {
        Swal.fire("","The Two Password Should be the Same","")
    } else {
        Swal.fire("","Enter Username,Password and Email","")
    }
})

/* end create account */





// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))
