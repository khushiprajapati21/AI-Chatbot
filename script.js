import {apiKey } from "./config.js"

const chatbox = document.getElementById("chat-box");
const userInput =  document.getElementById("user-input");
const sendBtn =  document.getElementById("send-btn");

window.onload = () => {
    const saveChat = loocalStorage.getItem("chatHistory");
    if(saveChat) chatbox.inertHTML = saveChat;
    chatbox.scrollTop = chatbox.scrollHeight;
}

function addMessage(message, classNme){
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message",classNme);
    msgDiv.textContent = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function showTyping(){
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.textContent = "AI is typing...";
    chatbox.appendChild(typingDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
    return typingDiv;
}

 async function getBotReplay(userMessage) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                contents: [{parts: [{text: userMessage}]}]
            })
        })

        const data = await response.json();
        
        if(response.ok){
            console.error("API Error:", data);
            return data?.error?.message || "Error fething response."
        }

        return(
            data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get that."
        )
    } catch (error) {
        
    }

}

sendBtn.onClick = async () => {
    const message = userInput.value.trim();
    if(message == "") return;
    addMessage(message, "user-message");
    userInput.value = ""

    const typingDiv = showTyping();

    const botReplay = await getBotReplay();
    typingDiv.remove();
    addMessage(botReplay, "bot-message");

    localStorage.setItem("chatHistory", chatbox.innerHTML);
    }


userInput.addEventListener("keypress",(e) => {
    if(e.key == "Enter") sendBtn.click();
 })