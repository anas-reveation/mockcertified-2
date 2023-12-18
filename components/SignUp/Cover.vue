<template>
  <div
    class="modal fade"
    id="exampleModal_1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="container my-4">
          <div class="row align-items-center justify-content-between">
            <div class="col-2"></div>
            <div class="col-8 d-flex align-items-center justify-content-center">
              <h5 class="modal-title font-size-24 text-center" id="exampleModalLabel">Sign Up</h5>
            </div>
            <div class="col-2">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
        <SignUpInner />
      </div>
    </div>
  </div>
</template>
