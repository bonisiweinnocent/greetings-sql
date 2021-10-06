document.addEventListener('DOMContentLoaded',function(){
    var errorsElement = document.querySelector('.emptyform')
    var roseElement = document.querySelector('.rose')
    var errorsElement1 = document.querySelector('.emptyform1')


if (errorsElement.innerHTML !== '' ) {
    setTimeout(function () {
        errorsElement.innerHTML = '';
    }, 3000);
    
}
if (errorsElement1.innerHTML !== '' ) {
    setTimeout(function () {
        errorsElement1.innerHTML = '';
    }, 3000);
    
}
if (roseElement.innerHTML !==''){
    setTimeout(function(){
        roseElement.innerHTML = '';
    },4000);
}
});
