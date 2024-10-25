import { Server, WebSocket } from "bun";
import { PubSub } from "./PubSub";

interface Client {
    ws: WebSocket;
    channels: Set<string>;
}

export class WebSocketServer {
    private pubsub: PubSub;
    private clients: Map<WebSocket, Client>;

    constructor() {
        this.pubsub = new PubSub();
        this.clients = new Map();
    }

    start(port: number = 3000): Server {
        return Bun.serve({
            port,
            fetch(req, server) {
                if (server.upgrade(req)) {
                    return; // Upgraded to WebSocket
                }
                return new Response("WebSocket server running");
            },
            websocket: {
                open: (ws) => this.handleConnection(ws),
                close: (ws) => this.handleDisconnection(ws),
                message: (ws, message) => this.handleMessage(ws, message),
            },
        });
    }

    private handleConnection(ws: WebSocket): void {
        console.log("Client connected");
        this.clients.set(ws, { ws, channels: new Set() });
    }

    private handleDisconnection(ws: WebSocket): void {
        const client = this.clients.get(ws);
        if (client) {
            client.channels.forEach(channel => {
                // Cleanup subscriptions
                this.pubsub.publish(channel, {
                    type: "system",
                    event: "user_disconnected",
                    channel
                });
            });
            this.clients.delete(ws);
        }
        console.log("Client disconnected");
    }

    private handleMessage(ws: WebSocket, message: string | Buffer): void {
        try {
            const data = JSON.parse(message.toString());
            const client = this.clients.get(ws);

            if (!client) return;

            switch (data.action) {
                case "subscribe":
                    this.handleSubscribe(client, data.channel);
                    break;
                case "unsubscribe":
                    this.handleUnsubscribe(client, data.channel);
                    break;
                case "publish":
                    this.handlePublish(data.channel, data.message);
                    break;
                default:
                    ws.send(JSON.stringify({ error: "Unknown action" }));
            }
        } catch (error) {
            ws.send(JSON.stringify({ error: "Invalid message format" }));
        }
    }

    private handleSubscribe(client: Client, channel: string): void {
        client.channels.add(channel);

        const unsubscribe = this.pubsub.subscribe(channel, (message) => {
            client.ws.send(JSON.stringify({
                channel,
                message
            }));
        });

        client.ws.addEventListener("close", unsubscribe);

        // Notify subscription success
        client.ws.send(JSON.stringify({
            type: "system",
            event: "subscribed",
            channel
        }));
    }

    private handleUnsubscribe(client: Client, channel: string): void {
        client.channels.delete(channel);
        client.ws.send(JSON.stringify({
            type: "system",
            event: "unsubscribed",
            channel
        }));
    }

    private handlePublish(channel: string, message: any): void {
        this.pubsub.publish(channel, message);
    }
}