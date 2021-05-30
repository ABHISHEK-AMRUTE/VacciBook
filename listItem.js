function getListItem(obj){
     const outerList = document.createElement('li')
     outerList.setAttribute('class','w3-display-container')

     const name = document.createElement('span')
     name.innerHTML = "<b>"+ obj.name +"</b> &nbsp;&nbsp;&nbsp;&nbsp;"

     const innerspan = document.createElement('span')
     innerspan.setAttribute('class','w3-button w3-transparent w3-display-right')
     innerspan.setAttribute('onclick',"this.parentElement.style.display='none'");
     innerspan.innerHTML = "&times;"

     const innerdiv = document.createElement('span')
     innerdiv.innerHTML = obj.address +", " + obj.block_name +", "+ obj.district_name +", "+ obj.state_name
    

    
     const age = document.createElement('span')
     age.setAttribute('class','w3-badge  w3-green')
     age.innerHTML =  obj.min_age_limit + "+"

     const dose1 = document.createElement('span')
     dose1.setAttribute('class',obj.available_capacity_dose1 ==0 ? 'w3-tag w3-red':'w3-tag w3-green')
     dose1.innerHTML = "Dose 1: "+ obj.available_capacity_dose1

     const dose2 = document.createElement('span')
     dose2.setAttribute('class',obj.available_capacity_dose2 ==0 ? 'w3-tag w3-red':'w3-tag w3-green')
     dose2.innerHTML = "Dose 2: "+ obj.available_capacity_dose2

     const space = document.createElement('span')
     space.innerHTML  = "&nbsp;&nbsp;"
     const spacee = document.createElement('span')
     spacee.innerHTML  = "&nbsp;&nbsp;"

     outerList.appendChild(name)
     outerList.appendChild(dose1)
     outerList.appendChild(spacee)
     outerList.appendChild(dose2)
     outerList.appendChild(space)
     outerList.appendChild(age)
     outerList.appendChild(innerspan);
     outerList.appendChild(document.createElement('br'))
     outerList.appendChild(innerdiv)
     return outerList;
}