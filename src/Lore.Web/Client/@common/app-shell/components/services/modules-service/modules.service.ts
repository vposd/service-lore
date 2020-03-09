import {
  Injectable,
  NgModuleRef,
  Type,
  NgModuleFactory,
  Compiler,
  Injector
} from '@angular/core';

import { AppShellConfig } from '@common/app-shell/config/app-shell.config.service';

export interface ModuleDescriptor<T> {
  reference: NgModuleRef<T>;
  type: Type<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private loadedModules = new Map<string, NgModuleRef<any>>();
  private moduleTypeLookup = new Map<NgModuleRef<any>, Type<any>>();

  constructor(
    private appShellConfig: AppShellConfig,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  get lazyModules() {
    return this.appShellConfig.featureModules;
  }

  async loadModule(
    id: string,
    factory: () => Promise<Type<any>>
  ): Promise<ModuleDescriptor<any>> {
    if (!this.loadedModules.has(id)) {
      const loadCallback = await factory();
      const moduleFactory =
        loadCallback instanceof NgModuleFactory
          ? loadCallback
          : await this.compiler.compileModuleAsync(loadCallback);

      const ref = moduleFactory.create(this.injector);
      this.loadedModules.set(id, ref);
      this.moduleTypeLookup.set(ref, moduleFactory.moduleType);
    }

    const reference = this.loadedModules.get(id);
    const type = this.moduleTypeLookup.get(reference);

    return { reference, type };
  }
}
