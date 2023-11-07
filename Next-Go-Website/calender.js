const calender = document.querySelector(".booking__calenders")
const calender_month_from = document.querySelector(".month-cont__month--from")
const calender_month_to = document.querySelector(".month-cont__month--to")
const dates_from = document.querySelector(".calender__dates--from")
const dates_to = document.querySelector(".calender__dates--to")
const rarrow = document.querySelector(".month-cont__rarrow")
const larrow = document.querySelector(".month-cont__larrow")
const user_input = document.querySelector(".container__input--dates")
const all_dates = document.querySelectorAll(".date-row__date")



let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let months_short = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let current_date = new Date()
let calen_month = current_date.getMonth()
let calen_year = current_date.getFullYear()
let selected_date = []
let mid_selected_date = []

calender_month_from.innerText = `${months[current_date.getMonth()]} ${current_date.getFullYear()}`
calender_month_to.innerText = `${months[current_date.getMonth()+1]} ${current_date.getFullYear()}`
if(current_date.getMonth() == 11){
    calender_month_to.innerText = `${months[0]} ${current_date.getFullYear()+1}`

}

document.addEventListener("click", function(e){
    let closeCal = true
    let closeguestroom = true
    for (let val of e.composedPath()){
        if(val.classList){
            if(val.classList.contains("booking__calenders")){
                closeCal = false
            }
            if(val.classList.contains("booking__rooms-guest")){
                closeguestroom =false
            }

        }

    }
    if(e.target == user_input){
        closeCal = false
    }
    if(e.target == rooms_guest){
        closeguestroom = false
    }
    if(closeCal){
        calender.style.display = "none"
    }
    if(closeguestroom){
        rooms_guest_input.style.display = "none"
        rooms_guest.innerText = `${childval+adultval} Guest ${roomsval} rooms`
    }
})

rarrow.addEventListener("click", function(e){

 UpdateCal(true)
    
})
larrow.addEventListener("click", function(e){
    UpdateCal(false)
})
user_input.addEventListener("click", function(e){
    let calstyle = window.getComputedStyle(calender, null)
    if(calstyle.display == "none"){

        calender.style.display = "block"
    }
    else{
        calender.style.display = "none"
   
    }
    
})






populateDates(calen_year, calen_month, dates_from)
if (calen_month == 11){
    populateDates((calen_year+1), 0, dates_to)
}
else{
    populateDates(calen_year, (calen_month+1), dates_to)
}


//Helper Functions

function getLastDateOfMonth(year, month) {
    // Create a Date object for the first day of the next month
    const nextMonthDate = new Date(year, month + 1, 1);
  
    // Subtract one day from the first day of the next month to get the last day of the current month
    const lastDate = new Date(nextMonthDate - 1);
  
    return lastDate.getDate();
  }

function populateDates(year, month, elem){
    let d = new Date(`${year}-${month+1}-01`)
    let ed = getLastDateOfMonth(year, month)
    let day =  d.getDay()
    let started = false
    let input_date = 1
    let date_row = document.createElement("div")
    date_row.classList.add("dates__date-row")
    elem.appendChild(date_row)
for(let i =1; i<43; i++){
    let date = document.createElement("div")
    let inner_date = document.createElement("div")
    inner_date.classList.add("date__inner-date")

    if( (days[day] == days[i-1]) && i < 8 && started == false){
     started = true
     i-= 1
    
     
    }
    else if((started == false && i< 8)|| (input_date>ed)){
        inner_date.innerText = ""
        date.classList.add("date-row__empty")
    }
    
    else if(started == true){
        if(input_date < current_date.getDate() && month == current_date.getMonth()){
            inner_date.style.color = "rgba(128, 128, 128)"
            date.classList.add("date-row__date-past")
         }
        inner_date.innerText = input_date
        let eachvalue = new Date(`${year}-${month+1}-${input_date}`)
        date.dataset.value = `${eachvalue.getFullYear()}-${eachvalue.getMonth()+1}-${eachvalue.getDate()}`
        date.dataset.selected = "false"
        date.dataset.mid_selected_date = "false"
        if(selected_date[0] == date.dataset.value || selected_date [1] == date.dataset.value){
            date.style.backgroundColor = "#02A4FF"
            date.style.color = "white"
            date.dataset.selected = "true"

        }
        for(let i of mid_selected_date){
            if(date.dataset.value == i){
                date.style.backgroundColor = "#02a2ff5b"
                date.dataset.mid_selected_date = "true"
            }
        }
        input_date = input_date+1
        if(date.classList.contains("date-row__date-past")==false){
            date.classList.add("date-row__date")
            if(date.dataset.selected == undefined){date.dataset.selected = "false"}
            
            date.addEventListener("click", function(e){
                if(date.dataset.selected == "false" && (selected_date.length<2)){
                    date.dataset.selected = "true"
                    selected_date.push(date.dataset.value)
                    date.style.backgroundColor = "#02A4FF"
                    date.style.color = "white"
                    if(selected_date.length == 2){
                        
                        let d1 = new Date(selected_date[0])
                        let d2 = new Date(selected_date[1])
                        if(d1<d2){
                            user_input.innerText = `${d1.getDate()} ${months_short[d1.getMonth()]} to ${d2.getDate()} ${months_short[d2.getMonth()]}`
                        }
                        else{
                            user_input.innerText = `${d2.getDate()} ${months_short[d2.getMonth()]} to ${d1.getDate()} ${months_short[d1.getMonth()]}`
                        }
                        addRemoveSelectedDates(d1, d2, false)

                        
                    }


                }
                else if(date.dataset.selected == "true"){
                    let d1 = new Date(selected_date[0])
                    let d2 = new Date(selected_date[1])
                    date.dataset.selected = "false"
                    let index = selected_date.indexOf(date.dataset.value)
                    selected_date.splice(index, 1)
                    if(selected_date.length == 1){
                        addRemoveSelectedDates(d1, d2, true)
                    }
                    
                    date.style.backgroundColor = "white"
                    date.style.color = "black"
                }

            })
            date.addEventListener("mouseover", function(e){
                if(date.dataset.selected == "false" && date.dataset.mid_selected_date == "false"){
                    date.style.backgroundColor = "#02A4FF"
                    date.style.color  = "white"
                }

            })
            date.addEventListener("mouseout", function(e){
                if(date.dataset.selected == "false" && date.dataset.mid_selected_date == "false"){ 
                date.style.backgroundColor = "white"
                date.style.color  = "black"}

            })

            
        }
        

    }
    if((i-1)%7==0){
        date_row = document.createElement("div")
        date_row.classList.add("dates__date-row")
        elem.appendChild(date_row)
    }
    date.appendChild(inner_date)
    date_row.appendChild(date)

    
 }
}
function UpdateCal(bool){
    if(calen_month == current_date.getMonth() && bool == false){
        return
    }
    while(dates_from.firstChild || dates_to.firstChild){
        if(dates_from.firstChild){
            dates_from.removeChild(dates_from.firstChild)
        }
        if(dates_to.firstChild){
            dates_to.removeChild(dates_to.firstChild)
        }
    }

    if(bool){
        calen_month+=1
        if(calen_month >11){
            calen_month = 0
            calen_year += 1
        }
    }
    else{
        calen_month-=1
        if(calen_month<0){
            calen_month = 11
            calen_year-=1
        }
    }
    calender_month_from.innerText = `${months[calen_month]} ${calen_year}`
   
    populateDates(calen_year, calen_month, dates_from)
    if (calen_month == 11){
        populateDates((calen_year+1), 0, dates_to)
        calender_month_to.innerText = `${months[0]} ${calen_year+1}`
    }
    else{
        populateDates(calen_year, (calen_month+1), dates_to)
        calender_month_to.innerText = `${months[calen_month+1]} ${calen_year}`
    }


}
function addRemoveSelectedDates(d1, d2, remove){
    if(remove == true){
        user_input.innerText = "When??"
    }
    while(true){
        console.log("o")
        if(d1<d2){
            d2.setDate(d2.getDate() - 1)
            if(d1.toDateString() == d2.toDateString()){
            break
            }
            let checkval = `${d2.getFullYear()}-${d2.getMonth()+1}-${d2.getDate()}`
            let d = document.querySelector(`div[data-value="${checkval}"]`)
            
            if(remove==false){
                if(d){
                    d.style.backgroundColor = "#02a2ff5b"
                    d.dataset.mid_selected_date = "true"
                    mid_selected_date.push(d.dataset.value)
                }
                else{
                    mid_selected_date.push(checkval)
                }

            }
            else{
                if(d){
                    d.style.backgroundColor = "white"
                    d.dataset.selected_date = "false"
                    d.dataset.mid_selected_date = "false"
                    mid_selected_date = []
                }

            }
            
           
        }
        else{
            d1.setDate(d1.getDate() - 1)
            if(d1.toDateString() == d2.toDateString()){
            break
            }
            let checkval = `${d1.getFullYear()}-${d1.getMonth()+1}-${d1.getDate()}`
            let d = document.querySelector(`[data-value="${checkval}"]`)
            if(remove==false){
                if(d){
                    d.style.backgroundColor = "#02a2ff5b"
                    d.dataset.mid_selected_date = "true"
                    mid_selected_date.push(d.dataset.value)
                }
                else{
                    mid_selected_date.push(checkval)
                }
            }
            else{
                if(d){
                    d.style.backgroundColor = "white"
                    d.dataset.selected_date = "false"
                    mid_selected_date = []
                }

       
            }
            
        }
    }
}