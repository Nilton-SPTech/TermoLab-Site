

var icon_solo1 = document.getElementById("div_icon_solo1")
var icon_solo2 = document.getElementById("div_icon_solo2")
var icon_solo3 = document.getElementById("div_icon_solo3")

var icon_conjunto1 = document.getElementById("div_icon_conjunto1")
var icon_conjunto2 = document.getElementById("div_icon_conjunto2")
var icon_conjunto3 = document.getElementById("div_icon_conjunto3")

var menu_solo = document.getElementById("menu_solo")
var menu_conjunto = document.getElementById("menu_conjunto")

var div_icon = document.getElementsByClassName("div_icon")

var navbar = document.getElementById("div_navbar")

var i = 1

 function expandir_navbar(num){
    
    i+= num

    if((i%2) == 0){

    navbar.style.width = "300px"

    menu_solo.style.display = "none"
    menu_conjunto.style.display ="flex"

    icon_solo1.style.display = "none"
    icon_solo2.style.display = "none"
    icon_solo3.style.display = "none"
    
    icon_conjunto1.style.display = "flex"
    icon_conjunto2.style.display = "flex"
    icon_conjunto3.style.display = "flex"
    document.getElementById("div_icon1").style.width = "300px"
    document.getElementById("div_icon2").style.width = "300px"
    document.getElementById("div_icon3").style.width = "300px"
    }
    else{
    navbar.style.width = "70px"

    menu_solo.style.display = "flex"
    menu_conjunto.style.display ="none"
    
    icon_solo1.style.display = "flex"
    icon_solo2.style.display = "flex"
    icon_solo3.style.display = "flex"
    
    icon_conjunto1.style.display = "none"
    icon_conjunto2.style.display = "none"
    icon_conjunto3.style.display = "none"

    document.getElementById("div_icon1").style.width = "70px"
    document.getElementById("div_icon2").style.width = "70px"
    document.getElementById("div_icon3").style.width = "70px"
    }
     
 }



 function sair(){
   window.location.href='../index.html'
   sessionStorage.clear()
 } 