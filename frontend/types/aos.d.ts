// types/aos.d.ts
declare module "aos" {
  interface AOSOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  class AOS {
    static init(options?: AOSOptions): void;
    static refresh(): void;
    static refreshHard(): void;
  }

  export default AOS;
}
