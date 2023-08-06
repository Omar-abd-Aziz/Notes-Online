/////* start firebase */////


/* start import all firebase methods filles from firebase js*/
import {firebaseConfig,initializeApp ,getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt  } from "../firebase.js";




/*1*/


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
    let username =  document.querySelector(".username-in").value;
    let password =  document.querySelector(".password-in").value;

    if (username.trim()!==""&&password.trim()!=="") {

        const q = query(collection(db, "accounts"), where("username", "==", `${username}`), where("password", "==", `${password}`));
        let snapshot = await getCountFromServer(q);
        console.log(snapshot.data().count);

        if(snapshot.data().count!==0){

            Swal.fire({
                title: 'Please Wait!',
                didOpen: () => {
                  Swal.showLoading()
                }
            });

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().id!==undefined){
                    document.querySelector(".username-in").value="";
                    document.querySelector(".password-in").value="";
                    /**/
                    localStorage.setItem("notes-online-id",doc.data().id);
                    /**/
                    location.href="../index.html";
                } else {
                    Swal.fire("","Usename Or Password Are Wrong","error");
                };
            });

        } else {
            Swal.fire("","Usename Or Password Are Wrong","error");
        };


    } else {Swal.fire("","Enter Usename And Password","error")}

});

/*End Sing In*/




/* start create account */

document.querySelector(".btn-sign-up").addEventListener("click",async()=>{
    let username = document.querySelector(".username-up").value;
    let password = document.querySelector(".password-up").value;
    let password2 = document.querySelector(".password-up-2").value;
    let email = document.querySelector(".email-up").value;


    if(username!=""&&password!=""&&password2!=""&&email!=""&&password==password2)
    {


        const q = query(collection(db, "accounts"), where("username", "==", `${username}`));
        let snapshot = await getCountFromServer(q);
        console.log(snapshot.data().count);

 

        if(snapshot.data().count==0){


            Swal.fire({
                title: 'Please Wait!',
                didOpen: () => {
                  Swal.showLoading()
                }
            });

            let id = Math.floor(Math.random() * 100000000);
            setDoc(doc(db,"accounts",`${id}`),{
              id: id,
              username: username,
              password: password,
              email: email,
              time: Date.now(),
              N:"",
            }).then(e=>{

                
                document.querySelector(".username-up").value="";
                document.querySelector(".password-up").value="";
                document.querySelector(".email-up").value="";
                document.querySelector(".password-up-2").value="";
                
                /**/
                Swal.fire(
                    ' Account has been Created ',
                    ' You Can Now Log In ',
                    'success'
                );
                /**/
                
                document.querySelector("#tab-1").click();

            });
        

        } else {
            Swal.fire("","Usename Are Used Chose Anthor Username","error");
        };


    } else if(username!=""&&password!=password2&&email!="") {
        Swal.fire("","The Two Password Should be the Same","error");
    } else {
        Swal.fire("","Enter Username,Password and Email","error");
    };

});

/* end create account */





/* start Forgot account Password account */


document.querySelector(".ForgotPassword").addEventListener("click",()=>{
    
    Swal.fire({
        title: ' Change Password ',
        html: `
    
        <div class="mainForm" style="overflow-y: hidden; overflow-c: scroll; font-size: 19px!important; font-family: 'Cairo', sans-serif; font-weight: bold!important;">
        
            <label for="Username"> Username: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="auto" autocomplete="off" id="Username" >
            
            <br>
            
            <label for="Email"> Email: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="rtl" autocomplete="off" id="Email">
        
            <br>
            
            <label for="NewPassword"> New Password: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="rtl" autocomplete="off" id="NewPassword">
    
        </div>
        
        `,
        confirmButtonText: 'Ok',
        showCancelButton: true,
    }).then(async (result) => {

        
        if (result.isConfirmed) {

            let Username = document.querySelector("#Username").value;
            let Email = document.querySelector("#Email").value;
            let NewPassword = document.querySelector("#NewPassword").value;
        
        

            if(Username.trim()!=""&&Email.trim()!=""&&NewPassword.trim()!=""){

                Swal.fire({
                    title: 'Please Wait!',
                    didOpen: () => {
                      Swal.showLoading()
                    }
                });
        
                let q = query(collection(db, "accounts"), where("username", "==", `${Username}`), where("email", "==", `${Email}`));
                let snapshot = await getCountFromServer(q);
                console.log(snapshot.data().count);
        
        
                if(snapshot.data().count!==0){

                    let querySnapshot = await getDocs(q);
                    let arrayOfAccounts = querySnapshot.docs.map(doc => doc.data());


                    setDoc(doc(db,"accounts",`${arrayOfAccounts[0].id}`),{
                        ...arrayOfAccounts[0],
                        password: NewPassword,
                    }).then(e=>{
                        Swal.fire("Done","","success")
                    });

                
                } else{
                    Swal.fire("Username Or Password Wrong","","error")
                };

            } else {
                Swal.fire("","","error")
            };
        
        };

    });


});    



/* start Forgot account Password  */







// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))
