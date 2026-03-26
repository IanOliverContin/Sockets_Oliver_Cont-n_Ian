export type TokenData = {
    id: string;
    phone: string;
}

export interface TokenGenerator {
    generate(data: TokenData): Promise<string>;
}
