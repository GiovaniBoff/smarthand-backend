import { Board } from 'johnny-five';

export default abstract class BoardIntegrated {
  private static gettingPromise: Promise<void> | null = null;
  private static board: Board = new Board();

  constructor() {
    BoardIntegrated.gettingPromise = this.connectToBoard();
  }

  private async connectToBoard(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (BoardIntegrated.board.isReady) {
        return resolve();
      }

      BoardIntegrated.board.on('ready', () => {
        BoardIntegrated.gettingPromise = null;
        resolve();
      });
    });
  }

  public abstract setPin(pin: number): Promise<void>;

  public async waitBoardBeReady(): Promise<void> {
    if (BoardIntegrated.board.isReady) {
      return Promise.resolve();
    }

    if (BoardIntegrated.gettingPromise) {
      return BoardIntegrated.gettingPromise;
    }
  }
}
