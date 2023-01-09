/// <reference types="node" />
declare var boards: ({
    name: string;
    baud: number;
    signature: Buffer;
    pageSize: number;
    numPages: number;
    timeout: number;
    productId: string[];
    productPage: string;
    protocol: string;
    aliases?: never;
    delay1?: never;
    delay2?: never;
    stabDelay?: never;
    cmdexeDelay?: never;
    synchLoops?: never;
    byteDelay?: never;
    pollValue?: never;
    pollIndex?: never;
} | {
    name: string;
    baud: number;
    signature: Buffer;
    productId: string[];
    productPage: string;
    protocol: string;
    pageSize?: never;
    numPages?: never;
    timeout?: never;
    aliases?: never;
    delay1?: never;
    delay2?: never;
    stabDelay?: never;
    cmdexeDelay?: never;
    synchLoops?: never;
    byteDelay?: never;
    pollValue?: never;
    pollIndex?: never;
} | {
    name: string;
    baud: number;
    signature: Buffer;
    pageSize: number;
    numPages: number;
    timeout: number;
    productId: string[];
    productPage: string;
    protocol: string;
    aliases: string[];
    delay1?: never;
    delay2?: never;
    stabDelay?: never;
    cmdexeDelay?: never;
    synchLoops?: never;
    byteDelay?: never;
    pollValue?: never;
    pollIndex?: never;
} | {
    name: string;
    baud: number;
    signature: Buffer;
    pageSize: number;
    delay1: number;
    delay2: number;
    timeout: number;
    stabDelay: number;
    cmdexeDelay: number;
    synchLoops: number;
    byteDelay: number;
    pollValue: number;
    pollIndex: number;
    productId: string[];
    productPage: string;
    protocol: string;
    numPages?: never;
    aliases?: never;
} | {
    name: string;
    baud: number;
    signature: Buffer;
    pageSize: number;
    numPages: number;
    timeout: number;
    productPage: string;
    protocol: string;
    productId?: never;
    aliases?: never;
    delay1?: never;
    delay2?: never;
    stabDelay?: never;
    cmdexeDelay?: never;
    synchLoops?: never;
    byteDelay?: never;
    pollValue?: never;
    pollIndex?: never;
})[];
/**
 * Generate an object with board name keys for faster lookup
 * @return {object} byBoardName
 */
declare function boardLookupTable(): {};
//# sourceMappingURL=boards.d.ts.map