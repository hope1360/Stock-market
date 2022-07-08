
//برای بسته بودن بازار در روزهای تعطیل
//عدد زیر را به 0 تغییر دهید
var iSMarketOpen= 0;

angular.module('ngApp').run(function ($rootScope) {
    $rootScope.$on('$ionicView.loaded', function () {
        if(iSMarketOpen) {
            var startTime = '09:00 AM';
            var endTime = '12:30 PM';

            var curr_time = getval();
            setTimeout(function(){
                if (get24Hr(curr_time) > get24Hr(startTime) && get24Hr(curr_time) < get24Hr(endTime)) {
                    var el = document.getElementsByClassName("market-status")[0]
                    el.innerText = "باز است";
                    el.style.color = "green";
                } else {
                    var el = document.getElementsByClassName("market-status")[0]
                    el.innerText = "بسته است";
                    el.style.color = "red";
                    
                }
            },500)

            function get24Hr(time){
                var hours = Number(time.match(/^(\d+)/)[1]);
                var AMPM = time.match(/\s(.*)$/)[1];
                if(AMPM == "PM" && hours<12) hours = hours+12;
                if(AMPM == "AM" && hours==12) hours = hours-12;

                var minutes = Number(time.match(/:(\d+)/)[1]);
                hours = hours*100+minutes;
                return hours;
            }

            function getval() {
                var currentTime = new Date()
                var hours = currentTime.getHours()
                var minutes = currentTime.getMinutes()

                if (minutes < 10) minutes = "0" + minutes;

                var suffix = "AM";
                if (hours >= 12) {
                    suffix = "PM";
                    hours = hours - 12;
                }
                if (hours == 0) {
                    hours = 12;
                }
                var current_time = hours + ":" + minutes + " " + suffix;

                return current_time;

            }
        }
    });
});