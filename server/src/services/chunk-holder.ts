import axios, { AxiosInstance } from 'axios';

export class ChunkHolderService {
  private client: AxiosInstance;
  private token: string;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.CHUNK_HOLDER_URL,
      headers: {
        'X-API-Key': process.env.CHUNK_HOLDER_API_KEY,
      }
    });

    this.client.interceptors.request.use(async (config) => {
      if (!this.token && config.url !== '/auth/generate-token') {
        await this.authorize();
      }

      config.headers.Authorization = this.token;
      
      return config;
    });

    this.client.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.response.status === 401) {
          const originalRequest = error.config;
          await this.authorize();

          return originalRequest;
        }

        this.token = null;
      },
    );
  }

  private async authorize(): Promise<void> {
    const response = await this.client.post('/auth/generate-token');

    this.token = response.data.token;
  }

  getChunk(chunkId: string) {
    return this.client.get(`/chunks/${chunkId}`);
  }
}
