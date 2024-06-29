const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const V1 = "v1";

const USER = "user";
const RAG = "rag";

const RETRIEVE_DOCUMENTS = "retrieve-documents";
const GENERATE_DOCUMENT = "generate-response";

export const USER_V1_RETRIEVE_DOCUMENTS = `${BASE_URL}/${USER}/${V1}/${RAG}/${RETRIEVE_DOCUMENTS}`;
export const USER_V1_GENERATE_DOCUMENT = `${BASE_URL}/${USER}/${V1}/${RAG}/${GENERATE_DOCUMENT}`;
