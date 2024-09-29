const express = require('express');
const cron = require('node-cron');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(express.json());

// Twilio configuration
const accountSid = 'ACbbce3ea5b9d92ba494649e3a1a7e018e';
const authToken = '47fca9cabae87469f361d46788e28528';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+18777804236';

// Mock database of todo items
let todos = [
  { id: 1, task: 'Complete project', deadline: '2023-06-01', userId: 1, completed: false },
  { id: 2, task: 'Buy groceries', deadline: '2023-05-30', userId: 1, completed: false },
];

// Mock user data
const users = [
  { id: 1, name: 'John Doe', friendPhone: '+1234567890' },
];

// Function to check if a todo is overdue
function isOverdue(deadline) {
  return new Date(deadline) < new Date();
}

// Function to send SMS
async function sendSMS(to, body) {
  try {
    const message = await twilioClient.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
      statusCallback: 'http://your-server-url/sms-status' // Replace with your actual server URL
    });
    console.log('Message sent successfully:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

// Cron job to check todos every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking todos...');
  
  const now = new Date();
  
  for (const todo of todos) {
    if (!todo.completed && isOverdue(todo.deadline)) {
      const user = users.find(u => u.id === todo.userId);
      if (user) {
        const message = `Your friend ${user.name} missed their deadline for task: ${todo.task}`;
        await sendSMS(user.friendPhone, message);
        console.log(`Sent reminder for task: ${todo.task}`);
        todo.completed = true; // Mark as completed to avoid repeated messages
      }
    }
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo Reminder Service');
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task, deadline, userId } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    deadline,
    userId,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Manually check for overdue tasks
app.get('/check-overdue', async (req, res) => {
  const now = new Date();
  let sentMessages = 0;
  
  for (const todo of todos) {
    if (!todo.completed && isOverdue(todo.deadline)) {
      const user = users.find(u => u.id === todo.userId);
      if (user) {
        const message = `Your friend ${user.name} missed their deadline for task: ${todo.task}`;
        const sent = await sendSMS(user.friendPhone, message);
        if (sent) {
          console.log(`Sent reminder for task: ${todo.task}`);
          todo.completed = true; // Mark as completed to avoid repeated messages
          sentMessages++;
        }
      }
    }
  }
  
  res.json({ message: `Checked for overdue tasks. Sent ${sentMessages} reminders.` });
});

app.post('/add-test-todo', (req, res) => {
  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60000).toISOString();
  const newTodo = {
    id: todos.length + 1,
    task: 'Test task',
    deadline: fiveMinutesFromNow,
    userId: 1,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// SMS status callback
app.post('/sms-status', (req, res) => {
  console.log('SMS Status Update:', req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});