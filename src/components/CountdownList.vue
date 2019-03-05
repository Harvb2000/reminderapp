<template>
    <div id="countdownComponent">
          <h1 class="componentTitles">Countdowns</h1>
          <ul>
            <countdown-timer
              v-for="(item) in countdownItems"
              :item="item"
              :key="item.id"
              class="reminder"
              v-bind:id="&quot;reminder_&quot;+item.Id"
            >
            </countdown-timer>
          </ul>
        </div>
</template>

<script>

import CountdownTimer from '@/components/CountdownTimer.vue';
export default {
    props: ['countdownItems'],
    components: {
        CountdownTimer
    }
}
</script>

<style>

</style>
