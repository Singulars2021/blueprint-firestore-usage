const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCQWBmzoLNMsp0POXdtVYBgdUVsolO_06s",
    authDomain: "firestore-test-59688.firebaseapp.com",
    projectId: "firestore-test-59688",
    storageBucket: "firestore-test-59688.appspot.com",
    messagingSenderId: "682821196103",
    appId: "1:682821196103:web:36bdd6b2024cf582a4d462"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const booksRef = firebase
    .firestore()
    .collection("books");



main()

async function main() {
    const res = await getData()
    console.log(res)
    const resOneDocument = await getDataById('yvy5yXKZAM4zmNCer5Es')
    console.log("One document: ", resOneDocument)
    // //const newId = await addNewDocument({
    //     title: "Como agua para cachalote - Segunda Parte",
    //     genre: "romantic"
    // })
    //console.log("Id generated of new book: ", newId)
    await updateDocument('yvy5yXKZAM4zmNCer5Es', {
        genre: "Comic"
    })

    addCollectionToCollection('fdff4545345efsdf')

    const resFilteredDocument = await getAllBooksByGenre('Comic')
    console.log("filtered document:", resFilteredDocument)
}

async function getData() {
    const snapshot = await booksRef.get()

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

async function getDataById(id) {
    const bookRefOne = firebase
        .firestore()
        .collection("books")
        .doc(id);
    const doc = await bookRefOne.get()
    console.log(doc.id)
    return doc.data()
}

async function addNewDocument(data) {
    const ref = await firebase
    .firestore()
    .collection("books")
    .add({
        ...data
    })

    return ref.id
}

async function updateDocument(id, data) {
    const bookRef = firebase.firestore().collection("books").doc(id);

    await bookRef.update({
      ...data
    })
}

async function getAllBooksByGenre(genre) {
    const snapshot = await firebase
    .firestore()
    .collection("books")
    .where("genre", "==", genre)
    .get()
    // falta mapear el id
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

async function addCollectionToCollection(user_id){
//  Otra manera   
//  const userBooksRef = firebase
//   .firestore()
//   .collection('users')
//   .doc(user_id)
//   .collection('books');

const userBooksRef = firebase.firestore().collection(`users/${user_id}/plantas`).add({
    title: "Gardenia",
  });
  
}

// firebase: ejemplo de como subscribirse a los cambios de una colección y tener los datos siempre actualizados en tu app 
//   .firestore()
//   .collection("books")
//   .onSnapshot((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     console.log("oneSnapShot: All data in 'books' collection", data);
//   });


