import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceProvider {

    constructor() {}

    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    read<T>(key: string): T {
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }

        return null;
    }

    sessionWrite(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    }

    sessionRead<T>(key: string): T {
        let value: string = sessionStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }

        return null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}