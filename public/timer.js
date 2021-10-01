document.addEventListener('DOMContentLoaded',function(){
    var errorsElement = document.querySelector('.emptyform')



if (errorsElement.innerHTML !== '') {
    setTimeout(function () {
        errorsElement.innerHTML = '';
    }, 3000);
}
});
