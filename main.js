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
    CountdownSecCounter: 0
  },
  methods: {
    /*addReminder: function() {
      if (this.setting == 1) {
        this.items.push({
          id: this.items.length + 1,
          title: this.reminderName,
          description: this.reminderDescription,
          time: this.reminderTime,
          counter: this.reminderTime * 60,
          minCounter: 0,
          secCounter: 0
        });
        this.startTimer(this.items.length - 1);
      } else if (this.setting == 2) {
        this.items.push({
          id: this.items.length + 1,
          title: this.reminderName,
          counter: 0,
          minCounter: 0,
          secCounter: 0
        });
        this.startTimer2(this.items.length - 1);
      }
    },*/

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
      console.log("add timer fired");
    },

    removeTimer: function(index) {
      this.timerItems.splice(index, 1);
    },

    removeCountdownReminder: function(index) {
      this.countdownItems.splice(index, 1);
    },

    /*removeReminder: function(index) {
      this.items.splice(index, 1);
    },*/
    startTimer: function(index) {
      setTimeout(() => {
        if (this.items[index].counter == 0) {
          alert("Timer finished");
        } else {
          this.startTimer(index);
          this.items[index].counter--;
          this.items[index].secCounter++;

          if (this.items[index].secCounter == 60) {
            this.items[index].minCounter++;
            this.items[index].secCounter = 0;
          }
        }
      }, 1000);
    },
    startTimer2: function(index) {
      setTimeout(() => {
        if (
          this.items[index].counter ==
          parseInt(this.items[index].reminderTime) * 60
        ) {
        } else {
          this.startTimer2(index);
          this.items[index].counter++;
          this.items[index].secCounter++;

          if (this.items[index].secCounter == 60) {
            this.items[index].minCounter++;
            this.items[index].secCounter = 0;
          }
        }
      }, 1000);
    },
    startCountdownTimer: function(index) {
      setTimeout(() => {
        if (this.countdownItems[index].countdownCounter == 0) {
          alert("Timer finished");
        } else {
          this.startCountdownTimer(index);
          this.countdownItems[index].countdownCounter--;
          this.countdownItems[index].countdownSecCounter++;
          console.log(this.countdownItems[index].countdownSecCounter);
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
