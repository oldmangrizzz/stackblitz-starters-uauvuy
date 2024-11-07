export class HuggingFaceService {
  private apiKey: string;

  constructor() {
    if (!process.env.NEXT_PUBLIC_HUGGINGFACE_KEY) {
      throw new Error('HuggingFace API key is required');
    }
    this.apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_KEY;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }

    return response.json();
  }

  async generateVisualContext(prompt: string): Promise<string> {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate visual context');
    }

    return response.json();
  }
}

export default HuggingFaceService;