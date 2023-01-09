declare const EventEmitter: any;
declare class SerialPort extends EventEmitter {
    constructor(port: any, options: any);
    list(callback: any): any;
    open(callback: any): void;
    close(callback: any): Promise<any>;
    set(props: {} | undefined, callback: any): Promise<any>;
    write(buffer: any, callback: any): any;
    read(callback: any): Promise<any>;
    flush(callback: any): any;
    drain(callback: any): any;
}
//# sourceMappingURL=browser-serialport.d.ts.map