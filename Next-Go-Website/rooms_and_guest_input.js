const rooms_guest= document.querySelector(".container__input--rooms-guest")
const rooms_guest_input = document.querySelector(".booking__rooms-guest")

const add = document.querySelectorAll(".add")
const subtract = document.querySelectorAll(".subtract")


const rooms = document.querySelector(".entity-input__value--rooms")
const adult_guest = document.querySelector(".entity-input__value--adult")
const child_guest = document.querySelector(".entity-input__value--child")

let childval = Number.parseInt(child_guest.innerText)
let adultval = Number.parseInt(adult_guest.innerText)
let roomsval = Number.parseInt(rooms.innerText)

rooms_guest.addEventListener("click", function(e){
    let rooms_guest_input_style = window.getComputedStyle(rooms_guest_input, null)
   if(rooms_guest_input_style.display == "none"){
    rooms_guest_input.style.display = "block"
   }
   else{
    rooms_guest_input.style.display = "none"
    rooms_guest.innerText = `${childval+adultval} Guest ${roomsval} rooms`
   }

})



increase_decrease(add, true)
increase_decrease(subtract, false)

function increase_decrease(array, add){
    for(let val of array){
        val.addEventListener("click", function(e){
            
                
                if(add){
                    if(val.classList.contains("add--child")){
                        childval+=1
                        child_guest.innerText = `${childval}`
                        
                    }
                    else if(val.classList.contains("add--adult")){
                        adultval+=1
                        adult_guest.innerText = `${adultval}`
                        
                    }
                    else if(val.classList.contains("add--rooms")){
                        roomsval +=1
                        rooms.innerText = `${roomsval}`
                        

                    }
                }
                else{
                    if(val.classList.contains("subtract--child") && childval>0){
                        childval-=1
                        child_guest.innerText = `${childval}`
                        
                    }
                    else if(val.classList.contains("subtract--adult") && adultval>1){
                        adultval-=1
                        adult_guest.innerText = `${adultval}`
                        
                    }
                    else if(val.classList.contains("subtract--rooms") && roomsval >1){
                        roomsval -=1
                        rooms.innerText = `${roomsval}`
                        
                    }
                }
            


        })
    }
}

