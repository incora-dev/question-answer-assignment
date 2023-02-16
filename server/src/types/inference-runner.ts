export interface IAskResponse {
  chunks: IChunk[];
}

interface IChunk {
  chunkId: string;
  confidence: number;
}