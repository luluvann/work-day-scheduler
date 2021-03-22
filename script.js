var currentDay = moment().format("dddd, MMMM Do YYYY");
var currentDayShort = moment().format("L");
var currentHour = moment().format("hA")
var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

$("#currentDay").text(currentDay)

function buildTimeBlocks(){
    for(var i=0;i<businessHours.length;i++){
        var timeBlock = businessHours[i]
        $("#timeBlocks").append(`<div class="row d-flex justify-content-center" >
                                        <div class="col-2 p-0">
                                                <p class="hour p1-1 m-0">${timeBlock}</p>
                                        </div>
                                        <div class="col-4 p-0">
                                            <p class="description p-1 m-0" id=${businessHours[i]}></p>
                                        </div>
                                        <div class="col-2 p-0">
                                            <button class="saveBtn" id=${"btn-"+businessHours[i]}><i class="fas fa-calendar-day"></i></button>
                                        </div>

                                  </div>`)
    }
}


function setDynamicClassHour(){
    var pastHours = []
    var futureHours = []

    //Check current hour and splice the businessHours array to past and future hours
    for(var i=0;i<businessHours.length;i++){
        if(businessHours[i] == "4PM"){
            pastHours = businessHours.splice(0,i)
            futureHours = businessHours.splice(1,businessHours.length-1)
            $("#4PM").addClass("present")
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

function getLocalStorage(){
    return JSON.parse(localStorage.getItem("workDayScheduler"))
}

function clearLocalStorage(){
    localStorage.removeItem("workDayScheduler")
}

function buildHourlyEntry(date,id,description){
    var workDayScheduler = getLocalStorage()    
    if(!workDayScheduler){
      var workDayScheduler = []
      var newEntry = {"date":date,"id":id,"description":description}
      workDayScheduler.push(newEntry)
      localStorage.setItem("workDayScheduler",JSON.stringify(workDayScheduler))
    } else {

        var descriptionOverrided = false
        var i = 0
        
        while(descriptionOverrided === false && i < workDayScheduler.length){
        
            if(workDayScheduler[i].date == currentDayShort && workDayScheduler[i].id == id){
                console.log("workDayScheduler at " + i + " index, date is: " + workDayScheduler[i].date + " and id is: "+ workDayScheduler[i].id)
                workDayScheduler[i].description = description
                console.log(workDayScheduler)
                descriptionOverrided = true
                localStorage.setItem("workDayScheduler",JSON.stringify(workDayScheduler))
                break;
            }

            if(descriptionOverrided === false && i == workDayScheduler.length-1){
                workDayScheduler.push({"date":date,"id":id,"description":description} )
                localStorage.setItem("workDayScheduler",JSON.stringify(workDayScheduler))
            }
            
            i++
        } 
    }   
}



buildTimeBlocks()

setDynamicClassHour()

$("#timeBlocks").on("click",".description",function(){
    var description = $(this)
    .text()
    .trim()

    var pClass = $(this).attr("class")
    var id = $(this).attr("id")
    
    var textInput = $("<textarea>")
    .val(description)
    .addClass(pClass)
    .attr("id",id)

    $(this).replaceWith(textInput)
    textInput.trigger("focus")
})

$("#timeBlocks").on("blur", "textarea", function() {
    var text = $(this)
    .val()
    .trim();

    var pClass = $(this).attr("class")
    var id = $(this).attr("id")

    var p = $("<p>")
    .addClass(pClass)
    .text(text)
    .attr("id",id)

     $(this).replaceWith(p);

     setDynamicClassHour()

});


$("#timeBlocks").on("click",".saveBtn", function() {
    var btnId = $(this).attr("id")
    var id = btnId.split("-")[1]
    var description = $("#"+id).text()
    buildHourlyEntry(currentDayShort,id,description)

});
