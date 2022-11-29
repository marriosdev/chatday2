<template>
  <div class="flex div-container justify-center" @keyup.enter="sendMessage">
    <div
      class="
        flex-1
        sm:p-6
        flex
        justify-items-center
        flex-col
        h-screen
        max-w-screen-xl
      "
    >
      <div class="flex sm:items-center justify-between px-4 py-3 border-b-2">
        <h1>Chat day</h1>
      </div>

      <div id="messages" class="scroll-smooth">
        <div v-for="message in messages" :key="message">
          <Message
            :message="message.msg"
            :username="message.name"
            :by="message.by"
            :status="message.status"
          />
        </div>
      </div>

      <div
        class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 bg-slate-00"
      >
        <div class="relative flex">
          <span class="absolute inset-y-0 flex items-center">
            <button
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                rounded-full
                h-10
                w-10
                transition
                duration-500
                ease-in-out
                text-gray-500
                hover:bg-gray-300
                focus:outline-none
              "
            >
              <ion-icon name="mic-outline" style="font-size: 20pt"></ion-icon>
            </button>
          </span>

          <input
            type="text"
            id="input-message"
            placeholder="Mensagem"
            class=""
            v-model="myMessage"
          />

          <div class="absolute right-0 items-center inset-y-0 sm:flex">
            <button class="button-send" @click="sendMessage">
              <ion-icon name="send-outline" class="h-6 w-6 ml-2"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Message from "../components/Message.vue";

export default {
  name: "Chat",

  data() {
    return {
      chat: null,
      messages: [],
      myMessage: "",
      statusMyMessage: "pending",
      byMessage: "",
    };
  },

  components: {
    Message,
  },

  methods: {
    connectWs() {
      this.chat = new WebSocket("wss://chat-day.herokuapp.com/wss");
    },

    openWs() {
      this.chat.onopen = (event) => {};
    },

    closeWs() {
      this.chat.onClose = (event) => {};
    },

    messageWs() {
      this.chat.onmessage = (event) => {
        let message = JSON.parse(event.data);
        message.by = "other";
        message.status = "ok";
        this.messages.push(message);
      };
    },

    errorWs() {
      this.chat.onerror = (event) => {};
    },

    async sendWs() {
      let message = {
        msg: this.myMessage,
        name: "Teste",
        by: "me",
        status: "pending",
      };

      this.messages.push(message)

      let msgJson = JSON.stringify(message);

      let response = this.chat.send(msgJson);
      console.log(response);

      message.status = "ok";
      this.myMessage = "";
    },

    sendMessage() {
      if (this.myMessage == "") {
        return false;
      }

      let message = {
        msg: this.myMessage,
        name: "Teste",
        by: "me",
        status: "pending",
      };

      this.sendWs(message);
    },
  },

  mounted() {
    this.connectWs();
    this.openWs();
    this.messageWs();
    this.closeWs();
    this.errorWs();
  },
};
</script>

<style>
.button-send {
  @apply inline-flex 
            items-center 
            justify-center 
            rounded-lg 
            px-4 
            py-3 
            duration-500 
            ease-in-out 
            text-white 
            bg-blue-500 
            hover:bg-blue-400 
            focus:outline-none;
}
#messages {
  @apply flex 
            flex-col 
            space-y-4 
            p-3 
            overflow-y-auto
            h-full
            bg-slate-800;
}
#input-message {
  @apply w-full 
            focus:outline-none 
            focus:placeholder-gray-400 
            text-gray-600 
            placeholder-gray-600 
            pl-12 bg-gray-200 
            rounded-md 
            py-3
            focus
}
</style>