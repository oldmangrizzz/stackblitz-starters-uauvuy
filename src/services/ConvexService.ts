import { ConvexClient } from 'convex/browser';

export class ConvexService {
  private client: ConvexClient;

  constructor() {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      throw new Error('Convex URL is required');
    }
    this.client = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  }

  async storeMemory(memory: any): Promise<string> {
    return await this.client.mutation('memories/store', { memory });
  }

  async retrieveMemories(query?: any): Promise<any[]> {
    return await this.client.query('memories/list', query);
  }
}

export default ConvexService;