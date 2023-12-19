export interface IOptions {
  maxFailures: number;
  minSuccesses: number;
  closeBreakerTimeout: number;
  openBreakerTimeout: number;
}

type TRequest = (...args: any[]) => Promise<any>;
type TState = "CLOSED" | "OPEN" | "HALF-OPEN";

export class UserByEmailCircuitBreakerService {
  request: TRequest;
  options: IOptions;

  state: TState = "CLOSED";
  triggerFromOpen: number = 0;
  successCount: number = 0;
  failCount: number = 0;
  finishTimeHalfState: number = 0;

  constructor(request: TRequest, options: IOptions) {
    this.request = request;
    this.options = options;
    console.log("constructor", this.request, this.options);
  }

  async fire(...args: any[]): Promise<any> {
    console.log("fire", this.state);
    console.log(
      Date.now(),
      this.triggerFromOpen,
      Date.now() < this.triggerFromOpen
    );
    if (this.state === "OPEN" && Date.now() < this.triggerFromOpen) {
      throw new Error("Circuit breaker is open2");
    }

    try {
      const response = await this.request(...args);
      console.log("data", response.data);
      return this.success(response.data);
    } catch (error) {
      //console.log(error);
      this.fail();
      throw new Error("Circuit breaker is open");
    }
  }

  success(response: any) {
    console.log("success", response);
    console.log("state", this.state);
    if (this.state === "HALF-OPEN") {
      this.successCount++;

      if (
        this.successCount >= this.options.minSuccesses ||
        Date.now() > this.finishTimeHalfState
      ) {
        this.state = "CLOSED";
        this.reset();
      }
    }

    if (this.state === "OPEN") {
      this.state = "CLOSED";
      this.reset();
    }

    console.log("response-success", response);
    return response;
  }

  fail() {
    if (this.state === "OPEN") {
      this.triggerFromOpen = Date.now() + this.options.openBreakerTimeout;
      return;
    }

    if (this.state === "CLOSED") {
      this.failCount = 1;
      this.state = "HALF-OPEN";
      this.finishTimeHalfState = Date.now() + this.options.closeBreakerTimeout;
      return;
    }

    if (this.state === "HALF-OPEN") {
      this.failCount++;

      if (Date.now() > this.finishTimeHalfState) {
        this.reset();
        this.failCount = 1;
        this.finishTimeHalfState =
          Date.now() + this.options.closeBreakerTimeout;
        return;
      }

      if (this.failCount >= this.options.maxFailures) {
        this.state = "OPEN";
        this.reset();
        this.triggerFromOpen = Date.now() + this.options.openBreakerTimeout;
        return;
      }
    }
  }

  reset() {
    this.failCount = 0;
    this.successCount = 0;
    this.finishTimeHalfState = 0;
  }
}
