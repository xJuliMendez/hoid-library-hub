<template>
  <div>
    <h1>My App</h1>
    <router-view />
    <button>
      <NuxtLink to="/test">
        go to test route
      </NuxtLink>
    </button>
    <button>
      <NuxtLink to="/upload-page">
        go to upload page
      </NuxtLink>
    </button>
  </div>
</template>
