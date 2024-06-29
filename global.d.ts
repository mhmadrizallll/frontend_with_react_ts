declare global {
    interface Window {
      parseJwt: (token: string) => any;
    }
  }
  