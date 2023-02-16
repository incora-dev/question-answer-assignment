export enum CircuitBreakerState {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
};

export interface ICircuitBreakerOptions {
  failureThreshold: number;
  timeout: number;
}
