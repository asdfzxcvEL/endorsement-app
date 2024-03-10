import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a2315-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field")
const inputFromEl = document.getElementById("input-from")
const inputToEl = document.getElementById("input-to")
const publishEl = document.getElementById("publish")
const endorsementListEl = document.getElementById("endorsement-list")


publishEl.addEventListener("click", function() {
    let message = inputFieldEl.value
    
    push(endorsementListInDB, message)
    
    clearInputsEl()
})

onValue(endorsementListInDB, function(snapshot) {
    let messagesArray = Object.values(snapshot.val())
    
    clearEndorsementListEl()
    
    for (let i = 0; i < messagesArray.length; i++) {
        let currentMessage = messagesArray[i]
        appendToEndorsementListEl(currentMessage)
    }  
    
      
})

function clearInputsEl() {
    inputFieldEl.value = ""
    inputFromEl.value = ""
    inputToEl.value = ""
}

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function appendToEndorsementListEl(message) {

    let newEl = document.createElement("li")
    newEl.textContent = message
    
    endorsementListEl.append(newEl)
}
