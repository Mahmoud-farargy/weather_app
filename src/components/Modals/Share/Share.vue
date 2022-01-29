<template>
  <Modal>
    <template #modal_body="{ closeModal }">
      <div id="sharePage" slot="modal_body">
        <div class="modal--header flex-row">
          <strong>Share</strong>
          <button
            class="close__modal__btn fas fa-times"
            @click="() => closeModal('share')"
          ></button>
        </div>
        <div class="social--items--container flex-row">
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :url="linkUrl"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
            class="social--item flex-column"
          >
            <span
              :title="`Share via ${network.name}`"
              :style="{ backgroundColor: network.color }"
              class="social__icon__container"
            >
              <i :class="network.icon"></i>
            </span>
            <span>{{ network.name }}</span>
          </ShareNetwork>
        </div>
        <div class="modal--footer">
            <div class="modal--footer--title flex-row">
                <strong>Page Link</strong>
                <span v-show="isCopied" class="text-danger fadeEffect">link copied</span>
            </div>
            <div class="link--zone flex-row">
              <span>{{linkUrl}}</span>
              <button @click="() => copyLink()"><i class="far fa-copy"></i></button>
            </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Modal.vue";
export default {
  data() {
    return {
      isCopied: false,
      sharing: {
        title: `Important recommendation`,
        description:`Hello, I just discovered a great app that can tell you the current weather of ${this.cityName || "your city"} or any other city in the world and
        it helps me a lot to determine what to wear before going out. It's a feature-rich weather app and guess what? it's for free. You should go check it out.
        `,
        quote: "Wherever you go, no matter what the weather, always bring your own sunshine.",
        hashtags: `weather,${this.cityName},city,javascript,vue.js`,
        twitterUser: "youyuxi",
      },
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        {
          network: "sms",
          name: "SMS",
          icon: "far fah fa-lg fa-comment-dots",
          color: "#333333",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
      ],
    };
  },
  props: {
    linkUrl: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true
    }
  },
  methods: {
    copyLink(){
      const link = this.linkUrl;
      const $body = document.getElementsByTagName("body")[0];
      const $tempInput = document.createElement("textarea");
      $body.appendChild($tempInput);
      $tempInput.innerHTML = link;
      $tempInput.style.whiteSpace = "pre-wrap";
      $tempInput.select();
      $tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      $body.removeChild($tempInput);
      this.isCopied = true;
    }
  },
  components: {
    Modal,
  },
};
</script>

<style lang="scss" scoped>
#sharePage {
  background: var(--white);
  border-radius: 0.4rem;
  overflow: hidden;
  width: 100%;
  button{
    cursor: pointer;
  }
  .close__modal__btn {
    border: none;
    padding: 0.3rem 0.4rem;
    border-radius: 0.2rem;
    background: none;
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-heavy);
    color: rgb(99, 99, 99);
    &:active {
      background: rgb(223, 223, 223);
    }
  }
  $border:1px solid var(--gray);
  .modal--header {
    padding: 0.5rem 1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: var(--dark);
    border-bottom: $border;
    strong {
      font-weight: 700;
    }
  }
  @media (min-width: 670px) {
    min-width: 400px;
  }
  .modal--footer{
    border-top: $border;
    padding: 1rem;
    .modal--footer--title{
        gap: 1rem 0.5rem;
        align-items: center;
    }
    .link--zone{
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      background: rgba(165, 139, 101, 0.2);
      padding: 0.3rem 0.6rem;
      border-radius: 0.2rem;
      color: var(--secondary-clr);
      font-weight: var(--font-weight-medium);
      span{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90%;
      }
      button{
        background: none;
        border: none;
        color: inherit;
        font-weight: var(--font-weight-heavy);
        font-size: 1.090rem;
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
        &:active{
          background: rgba(196, 196, 196, 0.4);
        }
      }
    }
  }
  .social--items--container {
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
    @media (max-width: 670px){
      padding: 0.5rem;
    }
    &, .social--item{
      justify-content: center;
      align-content: center;
      text-align: center;
    }
    .social--item {
      padding: 0 0.6rem;
      color: var(--dark);
      text-decoration: none;
      row-gap: 0.3rem;
      .social__icon__container {
        border: 1px solid var(--gray);
        display: grid;
        place-content: center;
        border-radius: 50%;
        padding: 1rem 1.1rem;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        i {
          justify-self: center;
          color: var(--white);
        }
      }
    }
  }
}
</style>