<template>
<div>
  <form id="form">
      <label for="title">Title</label>
      <input type="text" id="title">
      <label for="desc">Description</label>
      <textarea name="desc" id="desc" cols="30" rows="10"></textarea>
      <label for="date">Date</label>
      <input type="date" id="date">
      <button v-on:click="saveToFS()" type="button">Submit</button>
  </form>
</div>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore, doc, setDoc } from "firebase/firestore"
const db = getFirestore(firebaseApp)

export default {
    methods: {
        async saveToFS() {
            console.log("Hello")
            var title = document.getElementById("title").value
            var desc = document.getElementById("desc").value
            var date = document.getElementById("date").value
            
            console.log(title)

            await setDoc(doc(db, "Tasks", title), {
                Title: title,
                Description: desc,
                Date: date,
                Status: "new"
            }).then(() => {
                document.getElementById("form").reset()
            }) 
        }
    }
}
</script>

<style>

</style>