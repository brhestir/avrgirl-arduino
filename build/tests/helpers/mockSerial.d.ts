declare class MockSerial {
    open(callback: any): any;
    close(callback: any): any;
    drain(callback: any): any;
    set(props: any, callback: any): any;
    list(): Promise<never[]>;
}
export declare function list(): Promise<never[]>;
export declare namespace parsers {
    function raw(): void;
    function readline(): void;
    function byteLength(): void;
    function byteDelimeter(): void;
}
export { MockSerial as SerialPort };
//# sourceMappingURL=mockSerial.d.ts.map