var currentDay = moment().format("dddd, MMMM Do YYYY");
var currentHour = moment().format("hA")
var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

$("#currentDay").text(currentDay)

function buildTimeBlocks(){
    for(var i=0;i<businessHours.length;i++){
        var timeBlock = businessHours[i]
        $("#timeBlocks").append(`<div class="row" >
                                        <div class="col-4">
                                                <p class="hour">${timeBlock}</p>
                                        </div>
                                        <div class="col-6">
                                            <p class="description" id=${businessHours[i]}>Something</p>
                                        </div>
                                        <div class="col-2">
                                            <button class="saveBtn"><i class="fas fa-calendar-day"></i></button>
                                        </div>

                                  </div>`)
    }
}


function setDynamicClassHour(){
    var pastHours = []
    var futureHours = []

    //Check current hour and splice the businessHours array to past and future hours
    for(var i=0;i<businessHours.length;i++){
        if(businessHours[i] == currentHour){
            pastHours = businessHours.splice(0,i)
            futureHours = businessHours.splice(1,businessHours.length-1)
            $("#"+currentHour).addClass("present")
            }
        }

    //Set Class "future" to past hours
    for(var i = 0; i < pastHours.length; i++){
        $("#"+pastHours[i]).addClass("past")
    }
    //Set Class "future" to future hours
    for(var i = 0; i < futureHours.length; i++){
        $("#"+futureHours[i]).addClass("future")
    }

}
 

$(".description").on("click",function(){
    var description = $(this).text().trim()
    console.log(description)
})




buildTimeBlocks()

setDynamicClassHour()



