const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbox-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "sk-proj-mD4s0y9ojXsJzyiqeU3MT3BlbkFJ33aXMWwalgiuCdODhTsN";
const inputIniHeight = chatInput.scrollHeight;

const createChatLi = (message, className) =>{
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContnet = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`
  chatLi.innerHTML = chatContnet;
  chatLi.querySelector("p").textContent = message; 
  return chatLi;
}

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: userMessage}]
    })
  }

  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.classList.add("error");
    messageElement.textContent = "My Dearest, My Queen, Mi Yaa Bebe, Mi Sheila Bebe and My everything

Today is such a beautiful day, simply because it marks the day you came into this world. You were born to be extraordinary, to light up lives, and I thank the universe every day that you came into mine. My life has felt brighter, fuller, and just endlessly happier since you walked into it. And today, on your birthday, I want nothing more than to remind you of how deeply and completely I cherish you.

You are my everything – my sunshine on cloudy days, my laughter in the quiet moments, and my source of strength when I need it most. Being by your side, sharing moments both big and small, has shown me how incredible love can be. You inspire me to be better, to laugh more, and to embrace life with open arms. In you, I see everything I could ever wish for – kindness, courage, and a beauty that starts from within and shines for all to see.

Thank you, love, for all that you are. Thank you for being my confidant, my cheerleader, and my reason to smile. I feel so blessed to know you, to hold you, and to call you mine. You've shown me what it means to love and be loved, and there’s no way I could ever put into words how grateful I am for you. But today, I want you to know: you are cherished beyond words.

So, on this special day, I hope you feel all the love and joy you bring into my life. May your heart overflow with happiness, just as you’ve filled mine. Here’s to many more birthdays together, to endless laughter, to new dreams, and to a lifetime of love.

Happy Birthday, my love. You are, and always will be, my heart's greatest joy.

With all my love,
Boadu Prince";
}).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}


const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputIniHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming")
    chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputIniHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"))
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
