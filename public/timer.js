document.addEventListener('DOMContentLoaded',function(){
    var errorsElement = document.querySelector('.emptyform')
    var roseElement = document.querySelector('.rose')



if (errorsElement.innerHTML !== '') {
    setTimeout(function () {
        errorsElement.innerHTML = '';
    }, 3000);
    
}
if (roseElement.innerHTML !==''){
    setTimeout(function(){
        roseElement.innerHTML = '';
    },4000);
}
});
