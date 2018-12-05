import {TokenStorage} from './token-storage';
import {JWT_OPTIONS, JwtModuleOptions} from '@auth0/angular-jwt';

export function jwtOptionsFactory(tokenStorage: TokenStorage) {
  return {
    tokenGetter: () => {
      return tokenStorage.getToken();
    }
  };
}

export const jwtConfig: JwtModuleOptions = {
  jwtOptionsProvider: {
    provide: JWT_OPTIONS,
    useFactory: jwtOptionsFactory,
    deps: [TokenStorage]
  }
};
