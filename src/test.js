window.addEventListener("load", (event) => {
  console.log('test-js : EXECUTED!');
  let node = document.getElementById('test-heading');
  node.innerHTML = 'INTEL REPORTS';

});
window.onload = (event) => {
  console.log("page is fully loaded");
};