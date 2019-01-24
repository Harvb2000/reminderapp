new Vue({
  el: "#reminderapp",
  data: {
    minutes: 0,
    reminderName: null,
    reminderDescription: null,
    reminderTime: 0,
    items: [],
    setting: 1,
    disabled: 0,
    timeStamps: []
  },
  methods: {
    addReminder: function() {
      if (this.setting == 1) {
        this.items.push({
          id: this.items.length + 1,
          title: this.reminderName,
          description: this.reminderDescription,
          counter: this.reminderTime * 60
        });
        this.startTimer(this.items.length - 1);
      } else if (this.setting == 2) {
        this.items.push({
          id: this.items.length + 1,
          title: this.reminderName,
          counter: 0
        });
        this.startTimer2(this.items.length - 1);
      }
    },
    removeReminder: function(index) {
      this.items.splice(index, 1);
    },
    startTimer: function(index) {
      setTimeout(() => {
        if (this.items[index].counter == 0) {
          alert("Timer finished");
        } else {
          this.startTimer(index);
          this.items[index].counter--;
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
        }
      }, 1000);
    },
    toggleActive: function(item) {
      item.active = !item.active;
      console.log(item);
    },
    getTimeStamp: function() {
      this.timeStamps.push({
        id: this.timeStamps.length + 1,
        timeStamp: this.items.counter
      });
      console.log(this.timeStamps.id);
    }
  }
});
