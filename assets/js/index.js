const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => { //takes in user as a parameter
    if (user){ //check if user exists
        //output account info of a specific user by using their google generated uid (unique id)
        db.collection('users').doc(user.uid).get().then(doc => {
            //the backtick allows us to dynamically output data into curly braces
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html; //appents to accountDetails (.account-details)
        })
        
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block'); //display items when logged in
        loggedOutLinks.forEach(item => item.style.display = 'none'); //hide items when logged in
    }
    //if user is not logged in, else statement will run
    else {
        //hide account info
        accountDetails.innerHTML = ""; //removes account details when logged out
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none'); //hide items when logged out
        loggedOutLinks.forEach(item => item.style.display = 'block'); //display items when logged out
    }
}

//setup guides
const setupGuides = (data) => { //this function is called in auth.js

    if (data.length) { //is there is length to the data, it means the user is logged in
        let html = ""; //we will be appending to this empty string as we cycle through the data
        data.forEach(doc => { //will iterate through the array and fire a function for each element inside the array
            const guide = doc.data(); //grabs the data from each item
            //the backtick allows us to dynamically output data into curly braces

            //below we start at content[1] because content[0] is the title
            const li = `
            <li>
                    <div class = "collapsible-header grey lighten-4"><h1>${guide.title}</h1></div>
                    <div class = "collapsible-body white"><h3>What you'll need</h3><br>${guide.content[1]}</div>
                    <div class = "collapsible-body white"><h3>Steps/Prep</h3><br>${guide.content[2]}</div>
                    <div class = "collapsible-body white"><h3>Cooking</h3><br>${guide.content[3]}</div>
            </li>
        `;
            html += li //the html is itself plus the next thing added
        });

        guideList.innerHTML = html; //changes the html of guideList variable (see top of page) to the list we just iterated through
        
    }
    //if there is no length to the data, the user is not logged in and we display this message
    else {
        guideList.innerHTML = '<h5 class = "center-align white-text"> Login to view guides</h5>'
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () { //"When the content has been loaded onto the page..."

    var modals = document.querySelectorAll('.modal'); //grabs anything with a class of modal 
    M.Modal.init(modals);//M = materialize library, Modal is a method in that library, we are initializing it, and passing in our new variable

    var items = document.querySelectorAll('.collapsible'); //grabs anything with a class of collapsible
    M.Collapsible.init(items);//M = materialize library, Collapsible is a method in that library, we are initializing it, and passing in our new variable

});