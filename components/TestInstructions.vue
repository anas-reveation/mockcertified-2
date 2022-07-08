<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between align-items-center pb-5">
      <img src="@/assets/images/previous.png" width="30" @click="$router.back()" alt="" />

      <h2 class="text-center flex-grow-1">Test Instructions</h2>
    </div>
    <ol>
      <li class="fw-bolder">Lorem ipsum dolor sit amet consectetur itaque?</li>
      <li class="fw-bold">
        Test can be taken on devices such as Laptop/ Smart-Phone/ Tablet/ Desktop. Charge the Laptop
        / Smart Phone / Tablet well in advance to last for at least 2 hours.
      </li>
      <li class="fw-bold">
        The device should have continuous internet connectivity. Do not share the phone's hotspot
        with any other device while writing the Mock Test.
      </li>
      <li class="fw-bold">
        The student should login into the portal at least 10 minutes before the commencement of the
        examination.
      </li>
      <li class="fw-bold">
        Do NOT take photos, screen shots, hear audio, or record videos of the examination and then
        share it with others during the online examination, a remote proctor would watch such
        unwanted activities. If found doing such activities, it will be treated as malpractice.
      </li>
    </ol>
  </div>
</template>
