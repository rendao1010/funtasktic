<template>
  <div>
    <form id="form">
      <label for="title">Title</label>
      <input type="text" id="title" />
      <div class="tag-input">
        <div v-for="(tag, index) in tags" :key="tag" class="tag-input-tag">
          <span @click="removeTag(index)">x</span>
          {{ tag }}
        </div>
        <input
          type="text"
          placeholder="Enter a Tag"
          class="tag-input-text"
          @keydown.enter="addTag($event)"
          @keydown.delete="removeLastTag($event)"
        />
      </div>
      <label for="desc">Description</label>
      <textarea name="desc" id="desc" cols="30" rows="10"></textarea>
      <label for="date">Date</label>
      <input type="date" id="date" />
      <button v-on:click="saveToFS()" type="button">Submit</button>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      tags: ["hello", "world"],
    };
  },

  methods: {
    async saveToFS() {
      console.log("Hello");
      var title = document.getElementById("title").value;
      var desc = document.getElementById("desc").value;
      var date = document.getElementById("date").value;

      console.log(title);

      await setDoc(doc(db, "Tasks", title), {
        Title: title,
        Description: desc,
        Date: date,
        Status: "new",
        Tags: this.tags,
      }).then(() => {
        document.getElementById("form").reset();
      });
    },

    addTag: function (event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0) {
        this.tags.push(val);
        event.target.value = "";
      }
    },

    removeLastTag: function (event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input-tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input-tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input-text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>