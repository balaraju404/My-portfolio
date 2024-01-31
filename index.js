const sidebar=document.getElementById("sidebar");
const closeBtn=document.getElementById("closeBtn");
const closeDiv =document.getElementById("close");
const barsBtn=document.getElementById("bars");

closeBtn.addEventListener("click",function(){
    closeDiv.style.display=`none`
    sidebar.style.width=`0px`;
})

barsBtn.addEventListener("click",function(){
    closeDiv.style.display=`flex`
    sidebar.style.width=`70%`
})
