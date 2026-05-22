import { databases } from '@/app/appwrite';
import { ID, Query } from 'appwrite';

const AI_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_AI_DATABASE_ID || '<AI_DATABASE_ID>';
const PROMPTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID || '<PROMPTS_COLLECTION_ID>';
const AI_MODELS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_AI_MODELS_COLLECTION_ID || '<AI_MODELS_COLLECTION_ID>';
const GENERATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GENERATIONS_COLLECTION_ID || '<GENERATIONS_COLLECTION_ID>';

// This module still uses a simulated AI provider. Production usage requires
// a server-side provider integration with secret management, rate limits,
// output validation, tenant quotas, and audit logging.

async function initializeAIDatabase() {
  console.warn('initializeAIDatabase is a development helper. Run schema setup from trusted migration scripts in production.');
}

async function createAIModel(modelData) {
  try {
    const now = new Date().toISOString();
    return await databases.createDocument(AI_DATABASE_ID, AI_MODELS_COLLECTION_ID, ID.unique(), {
      ...modelData,
      createdAt: modelData.createdAt || now,
      updatedAt: now
    });
  } catch (error) {
    console.error('Error creating AI model:', error);
    throw error;
  }
}

async function getAIModels(provider = null) {
  try {
    const queries = [Query.orderAsc('name'), Query.limit(100)];
    if (provider) queries.push(Query.equal('provider', provider));

    const models = await databases.listDocuments(AI_DATABASE_ID, AI_MODELS_COLLECTION_ID, queries);
    return models.documents;
  } catch (error) {
    console.error('Error fetching AI models:', error);
    throw error;
  }
}

async function createPrompt(promptData) {
  try {
    const now = new Date().toISOString();
    return await databases.createDocument(AI_DATABASE_ID, PROMPTS_COLLECTION_ID, ID.unique(), {
      ...promptData,
      createdAt: promptData.createdAt || now,
      updatedAt: now
    });
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw error;
  }
}

async function getPrompts(filter = {}) {
  try {
    const queries = [Query.orderDesc('updatedAt'), Query.limit(filter.limit || 100)];
    if (filter.userId) queries.push(Query.equal('userId', filter.userId));
    if (filter.category) queries.push(Query.equal('category', filter.category));

    const prompts = await databases.listDocuments(AI_DATABASE_ID, PROMPTS_COLLECTION_ID, queries);
    return prompts.documents;
  } catch (error) {
    console.error('Error fetching prompts:', error);
    throw error;
  }
}

function buildSimulatedCodeOutput(inputData) {
  return {
    provider: 'simulated',
    code: `// Simulated generated code for ${inputData.featureName || 'feature'}\n// Replace this with a server-side AI provider integration before production.\n\nexport function ${inputData.featureName || 'generatedFeature'}() {\n  return { status: 'simulated' };\n}`,
    documentation: `# ${inputData.featureName || 'Generated Feature'}\n\nThis output is simulated and is not produced by a real AI provider yet.`
  };
}

function buildSimulatedUIOutput(inputData) {
  return {
    provider: 'simulated',
    componentCode: `export function ${inputData.componentName || 'GeneratedComponent'}() {\n  return <div>Simulated UI output. Connect a real AI provider before production.</div>;\n}`,
    styleCode: '',
    usageExample: `<${inputData.componentName || 'GeneratedComponent'} />`
  };
}

async function createGenerationRecord(userId, promptId, modelId, inputData) {
  return await databases.createDocument(AI_DATABASE_ID, GENERATIONS_COLLECTION_ID, ID.unique(), {
    userId,
    promptId,
    modelId,
    input: JSON.stringify(inputData),
    output: '',
    status: 'processing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

async function completeGenerationRecord(generationId, output) {
  await databases.updateDocument(AI_DATABASE_ID, GENERATIONS_COLLECTION_ID, generationId, {
    output: JSON.stringify(output),
    status: 'completed',
    updatedAt: new Date().toISOString()
  });
}

async function failGenerationRecord(generationId, error) {
  await databases.updateDocument(AI_DATABASE_ID, GENERATIONS_COLLECTION_ID, generationId, {
    output: JSON.stringify({ error: error.message || 'Generation failed' }),
    status: 'failed',
    updatedAt: new Date().toISOString()
  });
}

async function generateCode(promptId, userId, inputData) {
  let generation;

  try {
    await databases.getDocument(AI_DATABASE_ID, PROMPTS_COLLECTION_ID, promptId);
    generation = await createGenerationRecord(userId, promptId, 'simulated-code-v1', inputData);
    const output = buildSimulatedCodeOutput(inputData);
    await completeGenerationRecord(generation.$id, output);

    return { generationId: generation.$id, output };
  } catch (error) {
    if (generation?.$id) await failGenerationRecord(generation.$id, error);
    console.error('Error generating code:', error);
    throw error;
  }
}

async function generateUI(promptId, userId, inputData) {
  let generation;

  try {
    await databases.getDocument(AI_DATABASE_ID, PROMPTS_COLLECTION_ID, promptId);
    generation = await createGenerationRecord(userId, promptId, 'simulated-ui-v1', inputData);
    const output = buildSimulatedUIOutput(inputData);
    await completeGenerationRecord(generation.$id, output);

    return { generationId: generation.$id, output };
  } catch (error) {
    if (generation?.$id) await failGenerationRecord(generation.$id, error);
    console.error('Error generating UI:', error);
    throw error;
  }
}

async function getGeneration(generationId) {
  try {
    return await databases.getDocument(AI_DATABASE_ID, GENERATIONS_COLLECTION_ID, generationId);
  } catch (error) {
    console.error('Error fetching generation:', error);
    throw error;
  }
}

async function getUserGenerations(userId, filter = {}) {
  try {
    const queries = [
      Query.equal('userId', userId),
      Query.orderDesc('createdAt'),
      Query.limit(filter.limit || 100)
    ];

    if (filter.status) queries.push(Query.equal('status', filter.status));
    if (filter.modelId) queries.push(Query.equal('modelId', filter.modelId));

    const generations = await databases.listDocuments(AI_DATABASE_ID, GENERATIONS_COLLECTION_ID, queries);
    return generations.documents;
  } catch (error) {
    console.error('Error fetching user generations:', error);
    throw error;
  }
}

export {
  initializeAIDatabase,
  createAIModel,
  getAIModels,
  createPrompt,
  getPrompts,
  generateCode,
  generateUI,
  getGeneration,
  getUserGenerations
};
