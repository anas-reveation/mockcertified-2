<template>
  <div class="container">
    <p class="fw-bolder font_size_32">
      Your Account
      <br />
      Balance
    </p>
    <span>Click on the button to know your current balance</span>

    <p class="font_size_36">
      <span class="fw-bolder">$</span> <span class="text-muted">00.00</span>
    </p>

    <div class="text-center">
      <button class="btn btn-secondary border border-2 border-dark w-75 mb-3">
        Check your Balance
      </button>
      <button class="btn border border-2 border-primary text-primary w-75">View your Payout</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
};
</script>
