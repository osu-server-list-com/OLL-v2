export interface Server {
  id: number
  name: string
  safe_name: string
  url: string
  devserver: string
  image: string
  players: number
  votes: number
  timestamp: string
  server_ip: string
  server_port: string
  server_key?: string
}

export interface ServerPlaytime {
  serverId: number;
  serverName: string;
  serverImage: string;
  totalPlaytime: number;
  lastSession: {
    start: string;
    end?: string;
  };
} 