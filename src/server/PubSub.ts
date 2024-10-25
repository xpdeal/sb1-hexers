type Subscriber = (message: any) => void;

export class PubSub {
    private subscribers: Map<string, Set<Subscriber>>;

    constructor() {
        this.subscribers = new Map();
    }

    subscribe(channel: string, callback: Subscriber): () => void {
        if (!this.subscribers.has(channel)) {
            this.subscribers.set(channel, new Set());
        }

        this.subscribers.get(channel)!.add(callback);

        // Return unsubscribe function
        return () => {
            const channelSubscribers = this.subscribers.get(channel);
            if (channelSubscribers) {
                channelSubscribers.delete(callback);
                if (channelSubscribers.size === 0) {
                    this.subscribers.delete(channel);
                }
            }
        };
    }

    publish(channel: string, message: any): void {
        const channelSubscribers = this.subscribers.get(channel);
        if (channelSubscribers) {
            channelSubscribers.forEach(callback => callback(message));
        }
    }

    getSubscribersCount(channel: string): number {
        return this.subscribers.get(channel)?.size || 0;
    }

    getChannels(): string[] {
        return Array.from(this.subscribers.keys());
    }
}