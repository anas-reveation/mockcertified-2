<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light mb-4">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/dashboard">
        <img src="@/assets/images/fav.png" height="60" width="60" alt="" />
      </NuxtLink>
      <img
        src="@/assets/images/005-profile-user.png"
        height="40"
        class="opacity-75"
        width="40"
        alt=""
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <NuxtLink class="nav-link text-black" aria-current="page" to="/create-test">
              Create test
            </NuxtLink>
            <NuxtLink class="nav-link text-black" aria-current="page" to="/">Tests</NuxtLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  </nav>
</template>
