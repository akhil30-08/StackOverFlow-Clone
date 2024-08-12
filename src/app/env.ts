export const env = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID),
    apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_APIKEY),
  },
};
