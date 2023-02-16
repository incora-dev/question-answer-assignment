import { AxiosPromise } from 'axios';
import { ICircuitBreakerOptions, CircuitBreakerState } from '../types/circuit-breaker';

const DEFAULT_FAILURE_THRESHOLD = 5;
const DEFAULT_TIMEOUT = 5000;

export class CircuitBreaker<T> {
  private process: () => AxiosPromise;
  private state: CircuitBreakerState;

  private failureCount: number = 0;
  private interval: NodeJS.Timer;

  private failureThreshold: number;
  private timeout: number;

  constructor(process: () => AxiosPromise, options?: ICircuitBreakerOptions) {
    this.process = process;
    this.state = CircuitBreakerState.SUCCESS;

    this.failureThreshold = options?.failureThreshold || DEFAULT_FAILURE_THRESHOLD;
    this.timeout = options?.timeout || DEFAULT_TIMEOUT;
  }

  public async exec(): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      await this.handleProcess(resolve, reject);
      this.interval = setInterval(async () => {
        await this.handleProcess(resolve, reject);
      }, this.timeout);
    });
  }

  private async handleProcess(
    resolve: (value: T) => void,
    reject: (value: T) => void,
  ): Promise<void> {
    try {
      const response = await this.process();

      if (response.status === 200) {
        resolve(this.success(response.data));
      } else {
        reject(this.failure(response.data));
      }
    } catch (err) {
      reject(this.failure(err.message));
    }
  }

  private success(data: T): T {
    this.failureCount = 0;
    clearInterval(this.interval);

    if (this.state === CircuitBreakerState.PENDING) {
      this.state = CircuitBreakerState.SUCCESS;
    }

    return data;
  }

  private failure(data: T): T {
    this.failureCount += 1;

    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitBreakerState.FAILURE;
      clearInterval(this.interval);
    }

    return data;
  }
}