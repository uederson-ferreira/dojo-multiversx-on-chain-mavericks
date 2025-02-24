export interface IAProvider {
    getResponse(prompt: string): Promise<string>;
  }
  