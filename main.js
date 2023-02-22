const API = "http://localhost:8000/contactbook";
let nameInp = document.querySelector(".name-input");
let surnameInp = document.querySelector(".surname-input");
let photoInp = document.querySelector(".photo-input");
let phoneInp = document.querySelector(".number-input");
let emailInp = document.querySelector(".email-input");
let save = document.querySelector(".save_btn");
let list = document.querySelector(".list-group");
// console.log(nameInp, surnameInp, phoneInp, phoneInp, emailInp);

let infoBlock = {};

function eventInp() {
  infoBlock = {
    name: nameInp.value,
    surname: surnameInp.value,
    photo: photoInp.value,
    phone_number: phoneInp.value,
    email: emailInp.value,
  };
}

async function addContact() {
  eventInp();
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(infoBlock),
    });
  } catch (error) {
    console.log(error);
  }
  nameInp.value = "";
  surnameInp.value = "";
  photoInp.value = "";
  phoneInp.value = "";
  emailInp.value = "";

  readContact();
}
save.addEventListener("click", addContact);

async function readContact() {
  try {
    let res = await fetch(API);

    let contact = await res.json();

    creat(contact);
  } catch (error) {
    console.log(error);
  }
}

function creat(info) {
  list.innerHTML = "";
  info.forEach((item) => {
    list.innerHTML += `<div class="card" style="width: 18rem;">
      <img src=${item.photo} class="card-img-top" alt="error">
      <div class="card-body">
        <h6 class="card-title">Name: ${item.name}</h6>
        <h6 class="card-title">Surname: ${item.surname}</h6>
        <a href="#">email: ${item.email}</a>
        <a href="#" class="btn bg-warning-subtle border border-danger-subtle rounded-3">${item.phone_number}</a>
      </div>
      <div class="button">
      <button onclick="deleteContact(${item.id})" class ="btn btn-danger delete_btn">delete</button>
      <button onclick="editContact(${item.id})" class ="btn btn-success edit_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
      </div>
    </div>`;
  });
}
readContact();

// delete contact
async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    readContact();
  } catch (error) {
    console.log(error);
  }
}

// edit contact

let inpName = document.querySelector(".inp-name");
let inpSurname = document.querySelector(".inp-surname");
let inpPhoto = document.querySelector(".inp-photo");
let inpNumber = document.querySelector(".inp-number");
let inpEmail = document.querySelector(".inp-email");
let saveBtn = document.querySelector(".btnSave");
let editModal = document.querySelector("#exampleModal");

// console.log(
//   inpName,
//   inpEmail,
//   inpNumber,
//   inpPhoto,
//   inpSurname,
//   saveBtn,
//   editModal
// );

let saveContact = {};

function saveInp() {
  saveContact = {
    name: inpName.value,
    surname: inpSurname.value,
    photo: inpPhoto.value,
    phone_number: inpNumber.value,
    email: inpEmail.value,
  };
}

// console.log(saveContact);

async function editContact(id) {
  saveInp();
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();

    inpName.value = objToEdit.name;
    inpSurname.value = objToEdit.surname;
    inpPhoto.value = objToEdit.photo;
    inpNumber.value = objToEdit.phone_number;
    inpEmail.value = objToEdit.email;

    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}
saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  // console.log(e.target);
  saveInp();
  // console.log(saveContact);
  // console.log(id);

  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(saveContact),
    });
  } catch (error) {
    console.log(error);
  }
  readContact();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});
