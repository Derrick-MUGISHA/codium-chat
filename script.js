const chatList = document.getElementById('chat-list');
const messagesList = document.getElementById('messages');
const chatTitle = document.getElementById('chat-title');
const chatAvatar = document.getElementById('chat-avatar');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Sample Chat Data
const chats = [
    { id: 1, name: 'John Doe', avatar: 'assets/user1.png', messages: [{ type: 'incoming', text: 'Hey there!' }] },
    { id: 2, name: 'Jane Smith', avatar: 'assets/user2.png', messages: [{ type: 'incoming', text: 'Hello!' }] },
];

// Load Chats into Sidebar
function loadChats() {
    chats.forEach(chat => {
        const chatItem = document.createElement('li');
        chatItem.classList.add('chat-item');
        chatItem.innerHTML = `
            <img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">
            <div class="chat-name">${chat.name}</div>
        `;
        chatItem.addEventListener('click', () => loadChatWindow(chat));
        chatList.appendChild(chatItem);
    });
}

// Load Messages into Chat Window
function loadChatWindow(chat) {
    chatTitle.textContent = chat.name;
    chatAvatar.src = chat.avatar;
    messagesList.innerHTML = ''; // Clear messages
    chat.messages.forEach(msg => {
        const message = document.createElement('li');
        message.classList.add('message', msg.type);
        message.textContent = msg.text;
        messagesList.appendChild(message);
    });
    messageInput.disabled = false;
    sendButton.disabled = false;
}

// Send New Message
sendButton.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) {
        const message = document.createElement('li');
        message.classList.add('message', 'outgoing');
        message.textContent = text;
        messagesList.appendChild(message);
        messagesList.scrollTop = messagesList.scrollHeight;
        messageInput.value = '';
    }
});

// Initialize Chat App
document.addEventListener('DOMContentLoaded', () => {
    loadChats();
});
