// const express = require('express');
// const bodyParser = require('body-parser');
// const OpenAI = require('openai');

// const app = express();
// const port = 5000;

// // Replace with your OpenAI API key
// const OPENAI_API_KEY = 'sk-proj-ztq2a5gq2wZsO1rzjBHYT3BlbkFJTSXxXEIM91auDfxTh18R';
// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// // Assistant ID (replace with your actual assistant ID)
// const assistantId = 'asst_v4JnqYDxOjBIW8DZdacLRxWA';

// // Middleware
// app.use(bodyParser.json());

// app.post('/chat', async (req, res) => {
//   try {
//     const userMessage = req.body.message;

//     // Create a new thread
//     const thread = await openai.beta.threads.create();

//     // Send user message to the thread
//     await openai.beta.threads.messages.create(thread.id, {
//       role: 'user',
//       content: userMessage
//     });

//     // Create and poll the run
//     const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
//       assistant_id: assistantId
//     });

//     if (run.status === 'completed') {
//       // Retrieve messages from the thread
//       const messages = await openai.beta.threads.messages.list(run.thread_id);
//       const responseMessage = messages.data.reverse()[0].content[0].text.value;
//       for (const message of messages.data.reverse()) {
//         console.log(`${message.role} > ${message.content[0].text.value}`);
//       }
//       res.json({ botResponse: responseMessage });
//     } else {
//       res.json({ botResponse: 'Error: Run status is ' + run.status });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
