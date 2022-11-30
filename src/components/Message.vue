<template>
  <div class="chat-message">
    <div class="flex items-end" v-if="by == 'other'">
      <span> </span>
      <div
        class="
          flex flex-col
          space-y-2
          text-xs
          max-w-xs
          mx-2
          order-2
          items-start
        "
      >
        {{ username }}
        <div>
          <span class="other">{{ message }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-end justify-end" v-if="by == 'me'">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
      >
        <div class="flex">
          <span class="me">
            {{ message }}
          </span>
          <div class="text-lg flex">
            <ion-icon
              class="text-white self-end"
              name="checkmark-done-circle-outline"
              v-if="status == 'ok'"
            ></ion-icon>
            <ion-icon
              class="text-white self-end"
              name="ellipse-outline"
              v-if="status == 'pending'"
            ></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",

  props: {
    username: "",
    by: "",
    message: "",
    status: "pending",
  },

  data() {
    return {
      css: "",
    };
  },

  mounted() {
    let meCss = "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ";
    let otherCss = "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";

    if (this.by == "me") {
      this.css = meCss;
    } else {
      this.css = otherCss;
    }
  },
};
</script>

<style>
.other {
  @apply divide-rose-600
            px-4 
            py-2 
            rounded-lg 
            inline-block 
            rounded-bl-none 
            bg-indigo-600 
            text-white
            text-sm;
}
.me {
  @apply backdrop-brightness-200 bg-white/10
            px-4 
            py-2 
            rounded-lg 
            inline-block 
            rounded-br-none 
            bg-blue-500 
            text-white
            text-sm;
}
</style>