// src/test.js
export function init() {
  console.log("test.js :init()");
  const node = document.getElementById("test-heading");
  if (node) node.innerHTML = "INTEL REPORTS";
}
