<template>
  <el-row
    justify="center"
  >
    <el-col
      :span="20"
      :md="20"
      :sm="24"
      :xs="24"
    >
      <el-row gutter="32">
        <el-col
          :span="6"
          :md="8"
          :sm="24"
          :xs="24"
        >
          <div>
            <profile-side :user="user" />
            <el-divider class="hidden-md-and-up" />
          </div>
        </el-col>
        <el-col
          :span="18"
          :md="16"
          :sm="24"
          :xs="24"
        >
          <profile-main-section :user="user" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
  import { ref } from 'vue';
  import ProfileMainSection from '../components/profile/ProfileMainSection.vue'
  import ProfileSide from '../components/profile/ProfileSide.vue'
  import 'element-plus/theme-chalk/display.css'

  const user = ref(
    {
      name: "Harry Maguire",
      title: "Software Engineer",
      location: "London, UK",
      gender: "Male",
      avatar: "https://d3vlf99qeg6bpx.cloudfront.net/content/uploads/2022/03/16120029/Harry-Maguire-2-1.jpg",
      division: "Software Engineering",
      level: 14,
      aboutMe: "I am a software engineer with a passion for building software that improves the lives of people.",
      hobbies: "I love to play the guitar, and I love to code.",
      pastExperience: "I have been working in the IT industry for more than 10 years. I have worked on a number of projects in the IT industry, including:",
    }
  )
  
</script>

<style scoped>
  .centered {
    display: flex;
    
    justify-content: center;
  }
</style>