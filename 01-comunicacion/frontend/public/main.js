const msgBackend1 = document.getElementById("messageBackend1");
const msgBackend2 = document.getElementById("messageBackend2");

msgBackend1.innerHTML = "Waiting for backend1";
msgBackend2.innerHTML = "Waiting for backend2";

fetch("/api/config")
  .then((res) => res.json())
  .then((info) => fetch(info.pathBackend1))
  .then((res) => res.json())
  .then((resp) => {
    msgBackend1.innerHTML = resp.messageBackend1;
    msgBackend2.innerHTML = resp.messageBackend2;
  });
