+---------------------+                 +---------------------+                 +-------------------------+
| Your Computer       |                 | Default Gateway      |                 | Destination Computer     |
| IP: 192.168.1.10    |                 | Router IP: 192.168.1.1|                 | IP: 192.168.2.20        |
| Subnet Mask: /24    |                 | Route Table:         |                 |                         |
|                     |                 | 192.168.1.0/24 → eth0|                 |                         |
|   (1) Subnet Check: |                 | 192.168.2.0/24 → eth1|                 |                         |
|   Is dest in subnet? |                 | 0.0.0.0/0 → ISP     |                 |                         |
|          | Yes/No    |                 |                     |                 |                         |
+----------|----------+                 +----------|----------+                 +-----------|-------------+
           |                                   |                                     |
           | No (outside subnet)               | Match CIDR in route table?          |
           |                                   |                                     |
           v                                   v                                     v
+-------------------------+         +----------------------------+         +----------------------------+
| Send packet to          |         | Router forwards packet      |         | Destination receives packet |
| default gateway IP      | ------> | to next hop (eth1 interface)| ------> |                            |
+-------------------------+         +----------------------------+         +----------------------------+


+--------------------------------------------------------------+
|                     Your Computer (192.168.1.10)             |
+--------------------------------------------------------------+
| Destination IP = 8.8.8.8                                     |
| Subnet = 192.168.1.0/24                                      |
|                                                              |
| Step 1: Check if 8.8.8.8 is in my subnet?                    |
|    → No → Not in 192.168.1.0/24                              |
|                                                              |
| Step 2: Use Default Gateway                                  |
|    → Send to 192.168.1.1 (Your Router)                       |
+--------------------------------------------------------------+
                                |
                                v
+--------------------------------------------------------------+
|                     Your Router (192.168.1.1)                |
+--------------------------------------------------------------+
| Has a Route Table:                                           |
|                                                              |
| +------------------------+-------------------------------+  |
| | Destination CIDR       | Next Hop / Interface          |  |
| +------------------------+-------------------------------+  |
| | 192.168.1.0/24         | Local Network (eth0)          |  |
| | 0.0.0.0/0              | Send to ISP Gateway (eth1)    |  |
| +------------------------+-------------------------------+  |
|                                                              |
| Step 3: Look up route for 8.8.8.8 → matches 0.0.0.0/0        |
| Step 4: Forward to ISP                                        |
+--------------------------------------------------------------+
                                |
                                v
+--------------------------------------------------------------+
|                      ISP Router                              |
+--------------------------------------------------------------+
| Also has route table → knows how to reach 8.8.8.8            |
|                                                              |
| Step 5: Forwards to the next internet router                 |
| ... several routers later ...                                |
|                                                              |
| Eventually → reaches Google DNS (8.8.8.8)                    |
+--------------------------------------------------------------+


[ Your Phone ]
192.168.1.20
   │
   ▼
Checks: Is Telegram IP in subnet? ❌ No
   │
   ▼
Send to default gateway: 192.168.1.1
   │
   ▼
[ Router (Wi-Fi Device) ]
- Receives packet
- Uses route table inside to decide where to send it
- Sees default route → forward to Internet
   │
   ▼
[ ISP → Internet → Telegram Server (149.154.167.99) ]
