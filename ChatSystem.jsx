import React, { useState } from "react";
import './ChatSystem.css';
import './Dashboard.css';

export const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [groupMessage, setGroupMessage] = useState("");
  const [meetingDetails, setMeetingDetails] = useState({ title: "", date: "", time: "" });
  const [room, setRoom] = useState("General Room");
  const [usersInRoom, setUsersInRoom] = useState(["User1", "User2", "User3"]);

  // Handle user message input
  const handleMessageInput = (e) => setMessageInput(e.target.value);

  // Send a message to the chat
  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { user: "User1", text: messageInput }]);
      setMessageInput("");
    }
  };

  // Handle group message input
  const handleGroupMessageInput = (e) => setGroupMessage(e.target.value);

  // Send a group message
  const sendGroupMessage = () => {
    if (groupMessage.trim()) {
      setMessages([...messages, { user: "User1 (Group)", text: groupMessage }]);
      setGroupMessage("");
    }
  };

  // Handle meeting details input
  const handleMeetingDetails = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Schedule a meeting
  const scheduleMeeting = () => {
    alert(`Meeting Scheduled: ${meetingDetails.title} on ${meetingDetails.date} at ${meetingDetails.time}`);
    setMeetingDetails({ title: "", date: "", time: "" });
  };

  // Change chat room
  const handleRoomChange = (e) => setRoom(e.target.value);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="dashboard-title">Chat System</h2>
      <p className="text-gray-600 mb-4">Supports private and group messaging, meeting scheduling, and room allocation.</p>

      {/* Chat Interface */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg mb-6">
        <div>
          <h3 className="font-semibold mb-2">Chat Room: {room}</h3>
          <div className="h-48 overflow-auto border-b mb-4 p-2" style={{ maxHeight: "300px" }}>
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{msg.user}: </span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Input for sending private message */}
          <input
            type="text"
            value={messageInput}
            onChange={handleMessageInput}
            className="border p-2 rounded w-full"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
          >
            Send
          </button>
        </div>
      </div>

      {/* Group Messaging */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Group Messaging</h3>
        <input
          type="text"
          value={groupMessage}
          onChange={handleGroupMessageInput}
          className="border p-2 rounded w-full"
          placeholder="Type a group message"
        />
        <button
          onClick={sendGroupMessage}
          className="mt-2 p-2 bg-green-500 text-white rounded w-full"
        >
          Send to Group
        </button>
      </div>

      {/* Meeting Scheduling */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Schedule a Meeting</h3>
        <input
          type="text"
          name="title"
          value={meetingDetails.title}
          onChange={handleMeetingDetails}
          className="border p-2 rounded w-full mb-2"
          placeholder="Meeting Title"
        />
        <input
          type="date"
          name="date"
          value={meetingDetails.date}
          onChange={handleMeetingDetails}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="time"
          name="time"
          value={meetingDetails.time}
          onChange={handleMeetingDetails}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={scheduleMeeting}
          className="p-2 bg-purple-500 text-white rounded w-full"
        >
          Schedule
        </button>
      </div>

      {/* Room Allocation */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Room Allocation</h3>
        <select
          value={room}
          onChange={handleRoomChange}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="General Room">General Room</option>
          <option value="Tech Room">Tech Room</option>
          <option value="HR Room">HR Room</option>
        </select>

        <div>
          <h4 className="font-semibold">Users in {room}:</h4>
          <ul>
            {usersInRoom.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;

