"# blueprint-firestore-usage" 

## TODO

We need to implement a method to retrieve all the collections from a collections, for example, to retrieve all the pictures from the animals

```
db.collection("restaurants").doc("123").collection("reviews").get()
.then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
    });
});
```
