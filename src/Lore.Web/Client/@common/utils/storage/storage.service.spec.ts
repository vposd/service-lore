import { TestBed } from '@angular/core/testing';
import { configureTestSuite, mockLocalStorage } from 'lib/test-utils';

import { StorageService } from './storage.service';

let service: StorageService;

describe('[Core] Service: StorageService', () => {
  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.get(StorageService);

    mockLocalStorage();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.add', () => {
    it('should add item to localStorage and send key to public update stream', () => {
      let streamData = null;

      StorageService.updated.subscribe(data => (streamData = data));
      service.add('some', 'value');

      expect(localStorage.getItem('some')).toEqual('"value"');
      expect(streamData).toEqual('some');
    });

    it('should not send key to public update stream when withoutUpdateEvent=true', () => {
      const withoutUpdateEvent = true;
      service.add('some-1', 'value', withoutUpdateEvent);

      let streamData = 'not updated';
      StorageService.updated.subscribe(data => (streamData = data));

      expect(localStorage.getItem('some-1')).toEqual('"value"');
      expect(streamData).toEqual('not updated');
    });

    it('should not do anything without data', () => {
      service.add('some', undefined);

      let streamData = 'not updated';
      StorageService.updated.subscribe(data => (streamData = data));

      expect(localStorage.getItem('some')).toEqual(null);
      expect(streamData).toEqual('not updated');
    });

    it('should not update remote settings if data is equal with stored', () => {
      let remoteSettingUpdates = 0;
      StorageService.updated.subscribe(() => remoteSettingUpdates++);

      service.add('some', [1, 2, 3]);
      service.add('some', [1, 2, 3]);
      service.add('some', [1, 2, 3]);
      service.add('some', [1, 2, 4]);

      expect(localStorage.getItem('some')).toEqual(JSON.stringify([1, 2, 4]));
      expect(remoteSettingUpdates).toEqual(2);
    });
  });

  describe('.get', () => {
    it('should return parsed item from localStorage', () => {
      localStorage.setItem('key-array', '[1, "2"]');
      localStorage.setItem('key-string', '"value"');

      expect(service.get('key-array')).toEqual([1, '2']);
      expect(service.get('key-string')).toEqual('value');
      expect(service.get('key-null')).toEqual(null);
    });
  });

  describe('.clean', () => {
    // TODO: Rewrite test with local storage DI mock
    // it('should clean localStorage', () => {
    //   localStorage.setItem('key-array', '[1, "2"]');
    //   localStorage.setItem('key-string', '"value"');
    //   expect(localStorage.length).toBe(2);
    //   service.clean();
    //   expect(localStorage.length).toBe(0);
    // });
  });
});
