
<h2>OpenVPN Setup on AWS EC2</h2>

## Step 1: Launch EC2 Instance, Configure Security Group, and Attach Elastic IP  

- **1.1 Launch an EC2 Instance**  
  - Use the minimum required specifications (e.g., `t3.micro` for testing or `t3.small` for production).  
  - Do **not** assign a public IP during launch (you’ll attach an Elastic IP later).  

- **1.2 Configure Security Group**  
  - Allow only the required inbound ports:  
    - `22` → SSH access (restrict to your trusted IP if possible).  
    - `1194` → OpenVPN (UDP by default).  
  - Deny all unnecessary inbound traffic.  

- **1.3 Allocate and Attach an Elastic IP (EIP)**  
  - Allocate a new Elastic IP in your AWS account.  
  - Attach the Elastic IP to your EC2 instance to ensure the VPN server has a **stable public IP**.  

- **1.4 Apply Least Privilege Access**  
  - Restrict inbound rules to trusted IP ranges whenever possible for improved security.  


<p align="center">
  <img src="./ref-image/open-vpn-capture-01.png" alt="EC2 Instance with SG and EIP" title="EC2 Instance with SG and EIP" height="350" width="800"/>
  <br/>
  Pic: EC2 Instance with SG and EIP
</p>

## Steps 2: Connect Ec2 Instance via `PEM` file

2.1. Change EC2 Host Name

`sudo hostnamectl hostname open-vpn-server`

2.2 Downloaded and ran the installer

```bash
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh
sudo ./openvpn-install.sh
```
<p align="center">
  <img src="./ref-image/open-vpn-capture-02.png" alt="Execute OpenVPN Script and Setup" title="Execute OpenVPN Script and Setup" height="450" width="800"/>
  <br/>
  Pic: Execute OpenVPN Script and Setup
</p>


Setup choices made (Customize as you required)

1. Server private IP: 172.31.12.185 (Don't need to change)
2. Server public IP/hostname: 18.235.245.207 (Your EIP)
3. IPv6: disabled
4. Port: 1194 (default)
5. P5. rotocol: UDP (recommended)
6. DNS: Custom DNS
6. Compression: disabled
7. Encryption: default (secure)

2.3 Client creation and Client config file

1. Client name: nasir-ecom-prod-vpn
2. No password protection on client key.
3. Client certificate and config generated.
4. Client config file: `/home/ubuntu/nasir-ecom-prod-vpn.ovpn`

2.4 Download the .ovpn file to your local machine, for example

`scp -i "vpn-server.pem" ubuntu@52.220.176.226:/home/ubuntu/nasir-ecom-prod-vpn.ovpn `


2.5 You Local machine all traffic goes through VPN, Configure 
OpenVPN server for split-tunnel so that only your AWS VPC traffic only goes through VPN, and all other traffic uses the local gateway/DNS.

`sudo vim /etc/openvpn/server.conf`

```bash
port 1194
proto udp
dev tun
user nobody
group nogroup
persist-key
persist-tun
keepalive 10 120
topology subnet
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt

# This will prevent local Traffic through OpenVPN
#push "dhcp-option DNS 8.8.8.8"
#push "dhcp-option DNS 8.8.4.4"
#push "redirect-gateway def1 bypass-dhcp"

pull-filter ignore "dhcp-option DNS"
#ipv6
pull-filter ignore "dhcp-option DNS6"
push "route 10.46.0.0 255.255.0.0"
dh none
ecdh-curve prime256v1
tls-crypt tls-crypt.key
crl-verify crl.pem
ca ca.crt
cert server_UI9r5Fldqh4mnp7U.crt
key server_UI9r5Fldqh4mnp7U.key
auth SHA256
cipher AES-128-GCM
ncp-ciphers AES-128-GCM
tls-server
tls-version-min 1.2
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-128-GCM-SHA256
client-config-dir /etc/openvpn/ccd
status /var/log/openvpn/status.log
verb 3
```

2.6 Reload systemd units & Restart the OpenVPN server

```bash
sudo systemctl daemon-reload
sudo systemctl restart openvpn.service 
sudo systemctl restart openvpn@server
```

3. To add multiple OpenVPN users, create and run a client build script

The script will prompt you to enter:

1. VPN client name (e.g., nasir-user-2)
2. OpenVPN server public IP/EIP that you are attached with EC2 OpenVPN Instance

`vim build-client.sh`

```bash
#!/bin/bash

#=================================================
# Interactive OpenVPN Client .ovpn Generator
#=================================================

# Ask for client name
read -p "Enter client name: " CLIENT_NAME
if [ -z "$CLIENT_NAME" ]; then
    echo "Client name cannot be empty!"
    exit 1
fi

# Ask for OpenVPN server IP or hostname
read -p "Enter OpenVPN server IP/hostname: " SERVER_IP
if [ -z "$SERVER_IP" ]; then
    echo "Server IP/hostname cannot be empty!"
    exit 1
fi

# Paths (adjust if your setup differs)
OUTPUT_DIR="/etc/openvpn/clients"
EASYRSA_DIR="/etc/openvpn/easy-rsa"
TLS_KEY="/etc/openvpn/tls-crypt.key"

mkdir -p "$OUTPUT_DIR"

cd "$EASYRSA_DIR" || { echo "Easy-RSA directory not found!"; exit 1; }

# Build client certificate/key (no password)
./easyrsa build-client-full "$CLIENT_NAME" nopass

# Generate .ovpn file
CLIENT_OVPN="$OUTPUT_DIR/${CLIENT_NAME}.ovpn"

cat <<EOF > "$CLIENT_OVPN"
client
dev tun
proto udp
remote $SERVER_IP 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-128-GCM
auth SHA256
key-direction 1
verb 3
EOF

# Embed certificates and keys
echo "<ca>" >> "$CLIENT_OVPN"
cat pki/ca.crt >> "$CLIENT_OVPN"
echo "</ca>" >> "$CLIENT_OVPN"

echo "<cert>" >> "$CLIENT_OVPN"
cat pki/issued/${CLIENT_NAME}.crt >> "$CLIENT_OVPN"
echo "</cert>" >> "$CLIENT_OVPN"

echo "<key>" >> "$CLIENT_OVPN"
cat pki/private/${CLIENT_NAME}.key >> "$CLIENT_OVPN"
echo "</key>" >> "$CLIENT_OVPN"

echo "<tls-crypt>" >> "$CLIENT_OVPN"
cat "$TLS_KEY" >> "$CLIENT_OVPN"
echo "</tls-crypt>" >> "$CLIENT_OVPN"

echo "OpenVPN client file created: $CLIENT_OVPN"

```

`chmod +x build-client.sh`

`sudo ./build-client.sh`


3.2 Copy the OVPN file to your local machine and share with your users.

Use scp to securely transfer the generated .ovpn client configuration file from the OpenVPN server to your local system:

`scp -i vpn-server.pem ubuntu@52.220.176.226:/etc/openvpn/clients/nasir-user-2.ovpn .`

3.3 Verify and Test OpenVPN Connectivity

1. Import the .ovpn file into your local OpenVPN client.

2. Connect to the VPN and verify that you can access your AWS private resources.

3. Confirm that split-tunneling is working as expected (only AWS VPC traffic goes through VPN, while other traffic uses your local network).

<p align="center">
  <img src="./ref-image/open-vpn-capture-03.png" alt="OpenVPN Client Connected with AWS EC2 Instance OpenVPN" title="OpenVPN Client Connected with AWS EC2 Instance OpenVPN" height="450" width="800"/>
  <br/>
  Pic: OpenVPN Client Connected with AWS EC2 Instance OpenVPN
</p>
