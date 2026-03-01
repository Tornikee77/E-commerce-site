import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductGateWay {
  constructor(private readonly authService: AuthService) {}
  @WebSocketServer()
  private readonly server: Server;

  handleProductUpdated() {
    this.server.emit('productUpdated');
  }

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers['authentication'] as string;

      if (!token) {
        throw new WsException('Token not found');
      }

      this.authService.verifyToken(token);
    } catch (error) {
      client.disconnect();
    }
  }
}
