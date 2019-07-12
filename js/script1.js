console.log("ESTE ES LA VERSION 17 DE SCRIPT1");



document.getElementById('donde').innerHTML = document.location.href;






var btn = document.getElementById('elbtna');
var bio = document.getElementById('aquia');

var request = new XMLHttpRequest();

request.onreadystatechange = function() {
  if(request.readyState === 4) {
    bio.style.border = '1px solid #e8e8e8';
    if(request.status === 200) {
      bio.innerHTML = request.responseText;
    } else {
      bio.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
    }
  }
}

request.open('get', 'https://jsonplaceholder.typicode.com/todos/2');

btn.addEventListener('click', function() {
  this.style.display = 'none';
  request.send();
});
