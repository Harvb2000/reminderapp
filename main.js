new Vue({
  el: "#reminderapp",
  data: {
    countdownItems: [],
    timerItems: [],
    timerName: null,
    countdownReminderName: null,
    countdownReminderDescription: null,
    countdownReminderTime: 1,
    countdownReminderCounter: 0,
    timerMinCounter: 0,
    timerSecCounter: 0,
    CountdownMinCounter: 0,
    CountdownSecCounter: 0,
    whichForm: true,
    finishedItems: []
  },
  methods: {
    addCountdownReminder: function() {
      this.countdownItems.push({
        Id: this.countdownItems.length + 1,
        countdownTitle: this.countdownReminderName,
        countdownDescription: this.countdownReminderDescription,
        countdownTime: this.countdownReminderTime,
        countdownCounter: this.countdownReminderTime * 60,
        countdownMinCounter: 0,
        countdownSecCounter: 0
      });
      this.startCountdownTimer(this.countdownItems.length - 1);
    },

    addTimer: function() {
      this.timerItems.push({
        Id: this.timerItems.length + 1,
        timerTitle: this.timerName,
        timerCounter: 0,
        timerMinCounter: 0,
        timerSecCounter: 0
      });
      this.startTimerTimer(this.timerItems.length - 1);
    },

    removeTimer: function(index) {
      this.timerItems.splice(index, 1);
    },

    removeCountdownReminder: function(index) {
      this.countdownItems.splice(index, 1);
    },

    startCountdownTimer: function(index) {
      setTimeout(() => {
        if (this.countdownItems[index].countdownCounter == 0) {
          this.moveItem();
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
    }
  }
});
