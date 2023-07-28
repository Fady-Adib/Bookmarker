console.log("--script loaded successfully--");
var bookmarkNameInput = document.getElementById("bookmarkName")
var siteURLInput = document.getElementById("siteURL")
var submitBtn = document.getElementById("submitBtn")
var deleteBtn
var bookmarkList = []
var storageName = "bookmarkList"

if (JSON.parse(localStorage.getItem(storageName))) {
    bookmarkList = JSON.parse(localStorage.getItem(storageName))
    display()

}

submitBtn.addEventListener("click", saveBookmark)

function saveBookmark() {

    if (validationNameAlert() && validationSiteURLAlert()) {
        
        var bookmarkObj = {
            bookrmarkName: bookmarkNameInput.value,
            sitURL: siteURLInput.value
        }
        if (repeateFun(bookmarkObj.bookrmarkName)) {
            bookmarkList.push(bookmarkObj)
            localStorage.setItem(storageName, JSON.stringify(bookmarkList))

            display()
            swal("Good job!", "You Add your bookmark successfully", "success")

        }

    }

    clrForm()
}

//------------------------------------------clear entries-------------------------

function clrForm() {
    bookmarkNameInput.value = ""
    siteURLInput.value = ""
}

//-------------------------------------------display-------------------------------
function display() {

    var blackBox = ""
    for (let i = 0; i < bookmarkList.length; i++) {
        blackBox += `<tr>
                    <td>${i + 1}</td>
                    <td class="fs-4">${bookmarkList[i].bookrmarkName}</td>
                    <td><a href="${bookmarkList[i].sitURL}" class="btn btn-success fs-4"><i
                                class="fa-regular fa-eye me-2 "></i>Visite</a></td>
                    <td><button class="btn btn-danger fs-4 deleteBtn" id="deleteBtn"><i
                                class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
                </tr>`
    }
    document.getElementById("displayTable").innerHTML = blackBox

    deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn = Array.from(deleteBtn)
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function () {
            no = i

            deleteFun(no)
        })
    }

}
//------------------------------------------deletebtn----------------------------------------
function deleteFun(no) {

    bookmarkList.splice(no, 1)
    localStorage.setItem(storageName, JSON.stringify(bookmarkList))
    display()


}

// ---------------------------------validation Bookmark Name----------------------------------

function validBookmarkNameFun() {
    let Pattern = /[a-zA-b]{3,10}$/gm
    console.log(Pattern);
    let valid = Pattern.test(bookmarkNameInput.value)
    return valid
}
function validationNameAlert() {
    let valid = validBookmarkNameFun()
    if (valid) {
        document.getElementById("bookNameValidation").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("bookNameValidation").classList.replace("d-none", "d-block")
        sweetAlert("Oops...", "Must be 3-10 characters long letters only", "error");
    }
return valid
}

//-----------------------------------------validation url-------------------------------------

function validationSiteURLFun() {
    let pattern = /^(http(s){0,1}:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gm
    valid = pattern.test(siteURLInput.value)
    return valid
}
function validationSiteURLAlert(){
    let valid = validationSiteURLFun()
    if (valid) {
        document.getElementById("urlValidation").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("urlValidation").classList.replace("d-none", "d-block")
        sweetAlert("Oops...", "Must http(s)://(www.)site Name .(com)", "error");
    }
    return valid

}

//----------------------------------------validation repeat--------------------------------------

function repeateFun(x) {
    let repeate
    let repeateName = ""
    for (let i = 0; i < bookmarkList.length; i++) {
        if (x.toLowerCase() == bookmarkList[i].bookrmarkName.toLowerCase()) {
            repeateName = bookmarkList[i].bookrmarkName
        }
    }
    if (!(x.toLowerCase() == repeateName.toLowerCase())) {
        repeate = true
    } else {
        repeate = false
        sweetAlert("Oops...", "your book mark name is already exist", "error")
    }
    console.log(repeateName);
    return repeate
}

//----------------------------------------validation taping--------------------------------------

bookmarkNameInput.addEventListener("input", function () {
    tapingNameValidation()
})
function tapingNameValidation() {
    if (validBookmarkNameFun()) {
        bookmarkNameInput.classList.add("is-valid")
        bookmarkNameInput.classList.remove("is-invalid")
    } else {
        bookmarkNameInput.classList.add("is-invalid")
        bookmarkNameInput.classList.remove("is-valid")
    }
}
siteURLInput.addEventListener("input", function () {
    tapingURLvalidation()
})
function tapingURLvalidation() {   
    if (validationSiteURLFun()) {
        siteURLInput.classList.add("is-valid")
        siteURLInput.classList.remove("is-invalid")
    } else {
        siteURLInput.classList.add("is-invalid")
        siteURLInput.classList.remove("is-valid")

    }
}





