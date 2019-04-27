import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

import feathers from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';

/**
 * Simple wrapper for feathers
 */
@Injectable()
export class Feathers {
    private _feathers = feathers();                // init socket.io
    private _socket = io(environment.apiURL);      // init feathers
    constructor() {
        this._feathers
            .configure(feathersSocketIOClient(this._socket))  // add socket.io plugin
    }

    // expose services
    public service(name: string) {
        return this._feathers.service(name);
    }

    // expose authentication
    public authenticate(credentials?): Promise<any> {
        return this._feathers.authenticate(credentials);
    }

    // expose logout
    public logout() {
        return this._feathers.logout();
    }
}
