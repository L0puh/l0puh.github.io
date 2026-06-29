---
title: "net-sync"
date: 2023-07-14
status: "archived"
description: "sync game among clients and others network projects"
tech: ["c/c++", "sockets", "netinet", "tcp"] 
github: "https://github.com/L0puh/network-game"
---

# network-game 

one of my earliest networking projects, this system uses linux sockets and tcp to synchronize state between a central server and multiple connected clients. 

can be run with:

```bash
bash build.sh
```

in short, it's a multiplayer game where a server synchronizes player positions, hp, and combat actions across multiple clients in real-time. 

# other net projects from that time

- [ttf](https://github.com/L0puh/transfer_text_files) - transfer text files from one device to another using LAN
- [decentralized net](https://github.com/L0puh/pet_decentralized_net.git) - decentralized network in c++
- [first try](https://github.com/L0puh/first_try/tree/master/networking) - example of server-client architecture
- [http server](https://github.com/L0puh/http_server) - simple http server
- [auth-system](https://github.com/L0puh/authorization) - implementation of authorization proccess
- [daytime](https://github.com/L0puh/daytime) - daytime server-client
- [silent_stream](https://github.com/L0puh/silent_stream) -  icmp data transfer from client to server
