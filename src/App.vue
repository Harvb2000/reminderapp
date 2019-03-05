<template>
  <div id="app">
    <div id="titlediv"><h1>Reminderer</h1></div>
    <div id="reminderapp">
      <div class="settingsbar">
        <set-button  v-on:click="whichForm = false">
          Testing
        </set-button>
        <button class="settinbutton" v-on:click="whichForm = true">
          Count Down
        </button>
        <button class="settinbutton" v-on:click="whichForm = false">
          Timer
        </button>
      </div>
      <div id="reminderInput">
        <form v-on:submit.prevent="addCountdownReminder" v-show="whichForm">
          <label for="countdownReminderName">Reminder name</label>
          <input
            v-model="countdownReminderName"
            type="text"
            id="new-reminder"
            placeholder="Name"
            required
          />
          <label for="countdownReminderDescription">Reminder Description</label>
          <input
            v-model="countdownReminderDescription"
            type="text"
            id="new-description"
            placeholder="Description"
          />
          <label for="countdownReminderTime">Time</label>
          <input
            v-model="countdownReminderTime"
            type="number"
            id="new-timer"
            min="1"
            required
          />
          <button id="addbutton">Add</button>
        </form>

        <form v-on:submit.prevent="addTimer" v-show="!whichForm">
          <label>Reminder name</label>
          <input
            v-model="timerName"
            type="text"
            id="new-reminder"
            placeholder="Timer Name"
            required
          />
          <button id="addbutton">Add</button>
        </form>
      </div>
      <div id="grid">
        <countdown-list :countdown-items="countdownItems"></countdown-list>
        <!-- <div id="countdownComponent">
          <h1 class="componentTitles">Countdowns</h1>
          <ul>
            <countdown-timer
              v-for="(item) in countdownItems"
              :item="item"
              :countdown-items="countdownItems"
              :key="item.id"
              class="reminder"
              v-bind:id="&quot;reminder_&quot;+item.Id"
            >
            </countdown-timer>
          </ul>
        </div> -->
        <div id="timerComponent">
          <h1 class="componentTitles">Timers</h1>
          <ul>
            <li
              v-for="item,index in timerItems"
              class="timerReminder"
              v-bind:id="&quot;timerReminder_&quot;+item.Id"
            >
              {{ item.Id }}<br /><span class="title">{{ item.timerTitle }}</span
              ><br />
              <span class="counter">Counter:{{ item.timerCounter }} sec</span
              ><br />
              <span class="minCounter">{{ item.timerMinCounter }} mins</span>
              <span>{{ item.timerSecCounter }} seconds</span><br />
              <button class="close" v-on:click="removeTimer(index, item)">
                remove
              </button>
              <button class="close" v-on:click="timeStamp(index, item)">
                Time stamp
              </button>
            </li>
          </ul>
        </div>
        <div id="finishedComponent">
          <h1 class="componentTitles">Finished</h1>
          <ul>
            <li v-for="item,index in finishedCountdowns" class="fin">
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
                v-on:click="finishedItemRemove(index, item)"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
        <div id="testComp">
          <h1 class="componentTitles">Time Stamps</h1>
          <ul>
            <li v-for="item, index in timeStamps" class="timerReminder">
              <span>{{ item.timeStampId }}</span
              ><br />
              <span>Time stamped at: {{ item.timeStamp }} seconds</span><br />
              <span>
                {{ item.timeStampMin }} Minutes
                {{ item.timeStampSec }} Secs</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Bus from '@/bus';
import CountdownList from '@/components/CountdownList.vue';
import SetButton from '@/components/Button.vue'

export default {
  components: {
    CountdownList,
    SetButton
  },
  created(){
    Bus.$on('removeCountdownTimer', this.removeCountdownReminder)
  },
  data () {
    return {
      countId: 0,
      timeId: 0,
      countdownItems: [],
      timerItems: [],
      timerName: null,
      countdownReminderName: null,
      countdownReminderDescription: null,
      countdownReminderTime: 0,
      countdownReminderCounter: 0,
      timerMinCounter: 0,
      timerSecCounter: 0,
      CountdownMinCounter: 0,
      CountdownSecCounter: 0,
      whichForm: true,
      finishedCountdowns: [],
      timeStamps: []
    }
  },
  methods: {
    addCountdownReminder: function() {
      this.countdownItems.push({
        Id: this.countId + 1,
        countdownTitle: this.countdownReminderName,
        countdownDescription: this.countdownReminderDescription,
        countdownTime: this.countdownReminderTime,
        countdownCounter: this.countdownReminderTime * 60,
        countdownMinCounter: 0,
        countdownSecCounter: 0
      });
      this.countId++;
      this.startCountdownTimer(this.countdownItems.length - 1);
    },

    addTimer: function() {
      this.timerItems.push({
        Id: this.timeId + 1,
        timerTitle: this.timerName,
        timerCounter: 0,
        timerMinCounter: 0,
        timerSecCounter: 0
      });
      this.timeId++;
      this.startTimerTimer(this.timerItems.length - 1);
    },

    removeTimer: function(index) {
      if (this.timerItems.Id == this.timeStamps.id) {
        console.log("firedd");
        this.timeStamps.splice(index, 1);
      }
      this.timerItems.splice(index, 1);
      if (this.timerItems == 0) {
        this.timeId = 0;
      }
    },

    removeCountdownReminder: function(index) {
      this.countdownItems.splice(index, 1);
      if (this.countdownItems == 0) {
        this.countId = 0;
      }
    },

    finishedItemRemove: function(index) {
      this.finishedCountdowns.splice(index, 1);
    },

    startCountdownTimer: function(index) {
      setTimeout(() => {
        if (this.countdownItems[index].countdownCounter == 0) {
          this.moveToFinished(index);
        } else {
          this.startCountdownTimer(index);
          this.countdownItems[index].countdownCounter--;
          this.countdownItems[index].countdownSecCounter++;
          if (this.countdownItems[index].countdownSecCounter == 60) {
            this.countdownItems[index].countdownMinCounter++;
            this.countdownItems[index].countdownSecCounter = 0;
          }
        }
      }, 1000);
    },
    startTimerTimer: function(index) {
      setTimeout(() => {
        if (this.timerItems[index].timerCounter == undefined) {
        } else {
          this.startTimerTimer(index);
          this.timerItems[index].timerCounter++;
          this.timerItems[index].timerSecCounter++;

          if (this.timerItems[index].timerSecCounter == 60) {
            this.timerItems[index].timerMinCounter++;
            this.timerItems[index].timerSecCounter = 0;
          }
        }
      }, 1000);
    },
    moveToFinished: function(index) {
      this.finishedCountdowns.push(this.countdownItems[index]);
      this.countdownItems.splice(index, 1);
    },

    timeStamp: function(index) {
      this.timeStamps.push({
        timeStampId: this.timerItems[index].Id,
        timeStamp: this.timerItems[index].timerCounter,
        timeStampSec: this.timerItems[index].timerSecCounter,
        timeStampMin: this.timerItems[index].timerMinCounter
      });
      console.log(this.timeStamps);
    }
  }
}
</script>

<style>
#titlediv {
  display: block;
}

#reminderInput {
  display: block;
  background-color: bisque;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.theGrid {
  display: grid;
}

.reminderer {
  display: block;
  background-color: blanchedalmond;
}

input[type="text"] {
  border-radius: 3px;
  margin: 8px 0;
  box-sizing: border-box;
  border-style: none;
  padding-left: 5px;
}

label {
  background-color: rgb(248, 220, 185);
  margin: 5px;
  padding: 5px;
  border-radius: 3px;
}

input[type="number"] {
  box-sizing: border-box;
  border-radius: 3px;
  padding: 3px;
  margin: 8px;
  border-style: none;
}

ul {
  list-style-type: none;
  width: auto;
  padding-right: 8px;
  padding-left: 8px;
}

.close {
  margin: 3px;
  border-radius: 2px;
  border-style: none;
  background-color: rgb(248, 136, 136);
}

.settingsbar {
  background-color: sandybrown;
  display: block;
  height: 20px;
  border-radius: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 5px;
  width: auto;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

h1 {
  color: beige;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.settinbutton {
  border-radius: 5px;
  border-style: none;
}

.settinbutton:hover {
  background-color: rgb(153, 153, 153);
}

body {
  background-color: rgb(37, 37, 37);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#addbutton {
  border-style: none;
  border-radius: 5px;
}

#addbutton,
.close,
input,
select:active,
select:hover {
  outline-color: rgb(240, 188, 77);
}

#addbutton:hover {
  background-color: rgb(153, 153, 153);
}

.settinbutton,
select:active,
select:hover {
  outline-color: rgb(185, 131, 14);
}
#grid {
  display: flex;
}
.active {
  background-color: red;
}

#countdownComponent {
  display: block;
  width: 20%;
  background-color: rgb(71, 71, 71);
  padding-left: 0px;
  border-radius: 5px;
  height: auto;
  min-height: 85%;
}

.componentTitles {
  display: block;
  background-color: rgb(83, 83, 83);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-left: 5px;
  padding-top: 1px;
  margin-top: 0px;
  padding-bottom: 2px;
}

#timerComponent {
  display: block;
  width: 20%;
  background-color: rgb(71, 71, 71);
  padding-left: 0px;
  padding-top: 0px;
  border-radius: 5px;
  height: auto;
  min-height: 85%;
  margin-left: 10px;
}

#finishedComponent {
  display: block;
  width: 20%;
  background-color: rgb(71, 71, 71);
  padding-left: 0px;
  padding-top: 0px;
  border-radius: 5px;
  height: auto;
  min-height: 85%;
  margin-left: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(253, 218, 142);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(243, 204, 131);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(238, 200, 77);
}

.fin {
  background-color: rgb(231, 143, 131);
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 5px;
  border-color: none;
  overflow: auto;
}
.timerReminder {
  background-color: rgb(241, 206, 165);
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 5px;
  border-color: none;
  overflow: auto;
}

.reminder {
  background-color: rgb(248, 226, 200);
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 5px;
  border-color: none;
  overflow: auto;
}

#testComp {
  display: block;
  width: 20%;
  background-color: rgb(71, 71, 71);
  padding-left: 0px;
  padding-top: 0px;
  border-radius: 5px;
  height: auto;
  min-height: 85%;
  margin-left: 10px;
}

</style>