//listen for auth status changes (if the user is logged in or logged out)
auth.onAuthStateChanged(user => { //const auth is assigned in index.html, onAuthStateChanged is a firebase function
    //if the user is logged in:
    if (user) {
        // get data
        db.collection("guides").onSnapshot(snapshot => { //const db is assigned in index.html, .collection("guides") get a handle of the guides collection, .onSnapShot will update on the dom in realtime when changes are made in the database
            setupGuides(snapshot.docs); //setupGuides in a function in index.js and we are passing snapshot.docs as an argument
            setupUI(user); //runs setupUI in index.js with parameter "user"
        }, err => {
            console.log(err.message)
        });
    } 
    //if the user is not logged in:
    else {
        setupUI(); //runs setupUI in index.js with no parameter given
        setupGuides([]);//we pass an empty array through setupGuides function in index.js so no guides are shown if the use is logged out. Note that there is no length to this data
    }
});

//create new guide
const createForm = document.querySelector('#create-form'); //reference to id=create-form in index.html
createForm.addEventListener('submit', (e) => {  //listens for when the user clicks submit or hits enter.. (e) is the event object.. => is arrow function
    e.preventDefault(); //stops page from refreshing when submitting

    db.collection('guides').add({ //go into guides collection in firestore and add the following to the database...
        title: createForm['title'].value, //square bracket notation (grabs value from id="title" in html)
        content: createForm['content'].value //square bracket notation (grabs value from id="content" in html)
    }).then(() => {
        //close modal and reset form
        const modal = document.querySelector("#modal-create"); //reference to id=modal-create in index.html
        M.Modal.getInstance(modal).close();  //M = materialize library, Modal is a method in that library, we get the instance, then close it
        createForm.reset();  //clears out the form fields
    //if someone tries to write to database while not logged in, catches error and console logs what the error is
    }).catch(err => {
        console.log(err.message);
    })
})


//signup
const signupForm = document.querySelector("#signup-form"); //reference to id=signup-form in index.html
signupForm.addEventListener("submit", (e) => { //listens for when the user clicks submit or hits enter.. (e) is the event object.. => is arrow function
    e.preventDefault(); //stops page from refreshing when submitting

    //get info that the user put into email and password fields
    const email = signupForm['signup-email'].value; //square bracket notation (grabs value from id="signup-email" in html)
    const password = signupForm['signup-password'].value; //square bracket notation (grabs value from id="signup-password" in html)

    console.log(email, password);

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => { //uses a firebase method to create a user account with the email and password they put in
        //returning so we can tack on .then method later. Goes into 'users' collections (or creates 'users' collection if it doesn't exist)
        //references the uid of the user in credentials so the bio is only linked to that one user
        return db.collection('users').doc(cred.user.uid).set({ 
            bio: signupForm['signup-bio'].value //square bracket notation (grabs value from id="signup-bio" in html)
        });

    }).then(() => {
        const modal = document.querySelector("#modal-signup"); //reference to signup modal in index.html
        M.Modal.getInstance(modal).close(); //M = materialize library, Modal is a method in that library, we get the instance, then close it
        signupForm.reset(); //clears out the form fields
    });
});

//logout
const logout = document.querySelector("#logout"); //reference to id=logout in index.html
logout.addEventListener('click', (e) => { //listens for when the user clicks logout.. (e) is the event object.. => is arrow function
    e.preventDefault(); //stops page from refreshing when clicking
    auth.signOut(); //firebase method to sign out the user
});



// login
const loginForm = document.querySelector("#login-form"); //reference to id=login-form in index.html
loginForm.addEventListener('submit', (e) => { //listens for when the user clicks login.. (e) is the event object.. => is arrow function
    e.preventDefault(); //stops page from refreshing when submitting

    //get user info
    const email = loginForm['login-email'].value; //square bracket notation (grabs value from id="login-email" in html)
    const password = loginForm['login-password'].value; //square bracket notation (grabs value from id="login-password" in html)

    auth.signInWithEmailAndPassword(email, password).then(cred => { //uses a firebase method to sign in a user account with the email and password they put in
        //console.log(cred.user)
        const modal = document.querySelector("#modal-login"); //reference to id=modal-login in index.html
        M.Modal.getInstance(modal).close(); //M = materialize library, Modal is a method in that library, we get the instance, then close it
        loginForm.reset();  //clears out the form fields
    })
})