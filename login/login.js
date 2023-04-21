

/////* start firebase */////



/*1*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getFirestore, collection, getDocs,getDoc, setDoc, addDoc, doc,query,where } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

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



/*Start Sing In*/


document.querySelector(".btn-sign-in").addEventListener("click",async()=>{
    let username =  document.querySelector(".username-in").value
    let password =  document.querySelector(".password-in").value

    if (username.trim()!==""&&password.trim()!=="") {

        const q = query(collection(db, "accounts"), where("username", "==", `${username}`), where("password", "==", `${password}`));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.data().id!==undefined){
                document.querySelector(".username-in").value=""
                document.querySelector(".password-in").value=""
                /**/
                localStorage.setItem("notes-online-id",doc.data().id)
                /**/
                location.href="../index.html"
            } else {
                Swal.fire("","Usename Or Password Are Wrong");
            }
        });

    } else {Swal.fire("","Enter Usename And Password")}

})

/*End Sing In*/




/* start create account */

document.querySelector(".btn-sign-up").addEventListener("click",()=>{
    let username = document.querySelector(".username-up").value
    let password = document.querySelector(".password-up").value
    let password2 = document.querySelector(".password-up-2").value
    let email = document.querySelector(".email-up").value


    if(username!=""&&password!=""&&password2!=""&&email!=""&&password==password2)
    {

      let id = Math.floor(Math.random() * 100000000);
      setDoc(doc(db,"accounts",`${id}`),{
        id: id,
        username: username,
        password: password,
        email: email,
        time: Date.now(),
        N:"",
      });
  

      document.querySelector(".username-up").value=""
      document.querySelector(".password-up").value=""
      document.querySelector(".email-up").value=""
      document.querySelector(".password-up-2").value=""

      /**/
      Swal.fire(
        'تم انشاء الحساب',
        'يمكنك الان تسجيل الدخول',
        'success'
      )
      /**/

      document.querySelector("#tab-1").click()

    } else if(username!=""&&password!=password2&&email!="") {
        Swal.fire("","The Two Password Should be the Same","")
    } else {
        Swal.fire("","Enter Username,Password and Email","")
    }
})

/* end create account */





// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))
