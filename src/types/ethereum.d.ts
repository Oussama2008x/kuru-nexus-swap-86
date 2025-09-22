interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (params: { method: string; params?: any[] }) => Promise<any>;
    on?: (event: string, handler: (...args: any[]) => void) => void;
    removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  };
}