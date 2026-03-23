export type TokenData = {
    id: string;
}

export interface TokenGenerator {
    generate(data: TokenData): Promise<string>;
}
