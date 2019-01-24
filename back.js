

new Vue({
        el: '#reminderapp',
        data:{
            
                minutes: 0,
                remindername: null,
                reminderdescription: null,
                remindertime: 0,
                items: [],
                setting: 1,
                disabled: 0,
                timestampslist: [],
               sh: true,

        
        },
        methods: {
            addReminder: function() {
                if(this.setting == 1){
                let reminder = {
                    id: this.items.length+1,
                    title: this.remindername,
                    description: this.reminderdescription,
                    time: this.remindertime,
                    counter: this.remindertime*60,
                    

                    
                
                };
                Vue.set(this.items,this.items.length,reminder);  
                this.startTimer(this.items.length-1);
                
                
             
            } else if(this.setting == 2) {
                let reminder = {
                    id: this.items.length+1,
                    title: this.remindername,    
                    counter: 0,    
                };
                Vue.set(this.items,this.items.length,reminder);  
                this.startTimer2(this.items.length-1);
                
            }},
            removeReminder: function(index) {
                this.items.splice(index, 1);
            },
            startTimer: function(index) {    
              setTimeout(()=> { 
                 if ( this.items[index].counter == 0) {
                    alert("Timer finished");
                } else { 
                    this.startTimer(index);
                    this.items[index].counter--;

                    
                }
              }, 1000);  
            },
            startTimer2: function(index) {    
                setTimeout(()=> { 
                   if (this.items[index].counter == parseInt(this.items[index].remindertime)*60) {

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
              }
})