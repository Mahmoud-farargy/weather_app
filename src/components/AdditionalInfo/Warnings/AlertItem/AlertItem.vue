<template>
  <div id="alertItem" class="flex-column">
    <span v-if="alert.event" class="alert--event">{{ alert.event }}</span>
    <span v-if="alert.sender_name" class="alert--sender--name"
      >{{ alert.sender_name }}}</span
    >
    <div v-if="!showFullDescription">
      <p v-if="alert.description" @click="showFullDescription = true">
        {{ alert.description | trimText(200) }}
      </p>
    </div>
    <div v-else>
      <p @click="showFullDescription = false">{{ alert.description }}</p>
    </div>

    <small
      >Starts at: {{ formatTime(alert.start, { weekday: "short" }) }},
      {{ formatTime(alert.start, { month: "short" }) }}
      {{ formatTime(alert.start, { day: "2-digit" }) }}
      {{ formatTime(alert.start, { timeStyle: "short" }) }}
    </small>
    <small
      >Ends at: {{ formatTime(alert.end, { weekday: "short" }) }},
      {{ formatTime(alert.end, { month: "short" }) }}
      {{ formatTime(alert.end, { day: "2-digit" }) }}
      {{ formatTime(alert.end, { timeStyle: "short" }) }}</small
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFullDescription: false,
    };
  },
  props: ["alert"],
  methods: {
    formatTime(time, format) {
      return new Date(time * 1000).toLocaleString("en-us", format);
    },
  },
};
</script>

<style lang="scss" scoped>
#alertItem {
  .alert--event {
    text-transform: capitalize;
    color: #d23f31;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>