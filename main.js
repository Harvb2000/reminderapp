new Vue({
  el: "#reminderapp",
  data: {
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
      if (this.timerItems.Id === this.timeStamps.id) {
        console.log("firedd");
        this.timeStamps.splice(index, 2);
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
});
