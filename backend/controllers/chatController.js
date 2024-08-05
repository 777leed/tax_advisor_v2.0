const { PineconeStore } = require("@langchain/pinecone") ;
const { Pinecone } = require("@pinecone-database/pinecone") ;
const { StringOutputParser } = require("@langchain/core/output_parsers") ;
const { ChatPromptTemplate } = require("@langchain/core/prompts") ;
const {
  RunnablePassthrough,
} = require("@langchain/core/runnables") ;
const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai") ;
const { RunnableSequence } = require("@langchain/core/runnables");

const OPENAI_API_KEY = '';
const PINECONE_API_KEY = '';
const PINECONE_INDEX = 'docs-rag-chatbot';

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });

const pineconeIndex = pinecone.Index(PINECONE_INDEX);

var vectorStore;
async function initializeVectorStore() {
  try {
    vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({openAIApiKey:OPENAI_API_KEY}),
      { pineconeIndex }
    );
    
  } catch (error) {
    console.error('Error initializing vector store:', error);
  }
}


const persona = `
  You are a highly experienced tax advisor with over 20 years of experience in the field. 
  You specialize in various areas of tax law, including individual income tax, corporate tax, nonprofit organizations, 
  international tax, and estate planning. You are well-versed in both federal and state tax regulations. 
  Your approach is thorough and practical, ensuring that your responses are accurate and easily understandable 
  to individuals with varying levels of tax knowledge. You stay updated with the latest changes in tax laws and regulations 
  and are skilled in providing detailed, comprehensive advice on tax-related matters. 
  Your goal is to assist users by providing accurate information, answering their questions clearly and concisely, 
  and guiding them through common tax issues. If a question falls outside your expertise or is too complex to answer accurately, 
  ask for additional information.
`;

var template = `
${persona}
Answer the question based only on the following context:
{context}
Question: {question}
`;

const chatHistory = [];


async function chatbot(req, res) {
  const { query } = req.body;
  try {
    await initializeVectorStore();
    const prompt = ChatPromptTemplate.fromTemplate(template);

    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0,
      apiKey: OPENAI_API_KEY,
    });

    const chain = RunnableSequence.from([
      {
        context: async (input, config) => {
          if (!config || !("configurable" in config)) {
            throw new Error("No config");
          }
          const { configurable } = config;
          const cx = await vectorStore.asRetriever(configurable).getRelevantDocuments(input);
          const cxf = cx.map(doc => `-${doc.pageContent}`).join('\n');
          
          // Remove sequences of dots
          const cleanedOutput = cxf.replace(/\.\n+/g, ' ').replace(/\.\s+/g, ' ');
          
          
          return cxf
        },
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    const result = await chain.invoke(query, {
      configurable: { filter: { namespace: "f990-1.pdf" } },
    }

  );

  chatHistory.push({ question: query, answer: result });
  const historyString = chatHistory.map(entry => `user: ${entry.question}\nyou: ${entry.answer}`).join('\n');
  template = `
  ${persona}
  Answer the user based only on the following knowledge base retrieved using RAG, but only when it makes sense with the question:
  {context}
  chat history :
  ${historyString}   
  User input: {question}
  `;  

  
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

module.exports = { chatbot };
