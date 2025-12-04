const chatbox = document.getElementById("chat-box");
const userInput =  document.getElementById("user-input");
const sendBtn =  document.getElementById("send-btn");


function addMessage(message, classNme){
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message",classNme);
    msgDiv.textContent = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}



sendBtn.onClick = async () => {
    const message = userInput.value.trim();
    if(message == "") return;
    addMessage(message, "user-message");

    }