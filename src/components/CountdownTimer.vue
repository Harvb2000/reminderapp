<template>
    <li
        class="reminder"
        v-bind:id="&quot;reminder_&quot;+item.Id"
    >
        {{ item.Id }}<br /><span class="title">{{
        item.countdownTitle
        }}</span
        ><br />
        <span>{{ item.countdownDescription }}</span
        ><br />
        <span class="time">Timer set to:{{ item.countdownTime }} min</span
        ><br />
        <span class="counter"
        >Counter:{{ item.countdownCounter }} sec</span
        ><br />
        <span class="minCounter"
        >{{ item.countdownMinCounter }} mins</span
        >
        <span>{{ item.countdownSecCounter }} seconds</span><br />

        
            <button
              class="close"
              v-on:click="removeCountdownReminder(index, item)"
              >
              remove
              </button>
        
    </li>
</template>

<script>

import Bus from '@/bus';
export default {
    props: ['item', 'countdownItems'],
    methods: {
        removeCountdownTimer(){
            Bus.$emit('removeCountdownTimer', index);
            // this.countdownItems.splice(index, 1);
        }
    }
}
</script>

<style scoped>

</style>
