// by using import you import functions/methods from Firebase so you can use them in javascript to connect with your realtime database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://endorsements-9d784-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const experiencesInDB = ref(database, "experiences")

const inputFieldEl = document.getElementById("input-el")
const sendButtonEl = document.getElementById("send-button")
const experiencesListEl = document.getElementById("experiences-list")
const toField = document.getElementById("review-to")
const fromField = document.getElementById("review-from")
const removeButtonEl = document.getElementById("remove-button")

sendButtonEl.addEventListener("click", function(){
    if (inputFieldEl.value === "" || toField.value === "" || fromField.value === "") {
        alert("Please fill in all input fields")
    }
    else {

    const reviewText = inputFieldEl.value
    const reviewFrom = fromField.value
    const reviewTo = toField.value

    push(experiencesInDB, {reviewText, reviewFrom, reviewTo})

    clearTextFields()
    }

})

onValue(experiencesInDB, function(snapshot){
    if (snapshot.exists()) {
        const experiencesArray = Object.entries(snapshot.val())
        experiencesArray.reverse()

        clearExperiencesListEl()

        for (let i = 0; i < experiencesArray.length; i++) {
            let currentExperience = experiencesArray[i]
            let currentExperienceID = currentExperience[0]
            let {reviewText, reviewFrom, reviewTo } = currentExperience[1]
        
            appendItemToExperiencesListEL(currentExperience)
        }

    } else {
        experiencesListEl.textContent = "No reviews written yet"
    }

})


function appendItemToExperiencesListEL(experience) {
      let experienceID = experience[0]
      let { reviewText, reviewFrom, reviewTo } = experience[1]

    experiencesListEl.innerHTML += `
        <li>
        <p class="bold">From: ${reviewFrom}</p>
        <p>${reviewText}</p>
        <p class="bold">To: ${reviewTo}</p>
        </li>
      `
}

removeButtonEl.addEventListener("click", function(){
    let experiencesInDB = ref(database, "experiences")
    remove(experiencesInDB)
})
    

function clearExperiencesListEl() {
    experiencesListEl.innerHTML = ""
}

function clearTextFields() {
    inputFieldEl.value = ""
    fromField.value = ""
    toField.value = ""
}




