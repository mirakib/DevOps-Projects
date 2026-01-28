resource "aws_vpc" "main_vpc" { 
  cidr_block = var.vpc_cidr 
  tags = { 
    Name = "MainVPC" 
  } 
} 
resource "aws_subnet" "main_subnet" { 
  vpc_id            = aws_vpc.main_vpc.id 
  cidr_block        = var.subnet_cidr 
  availability_zone = "us-east-1a" 
  map_public_ip_on_launch = true 
  tags = { 
    Name = "MainSubnet" 
  } 
} 
resource "aws_internet_gateway" "main_igw" { 
  vpc_id = aws_vpc.main_vpc.id 
} 
resource "aws_route_table" "main_rt" { 
  vpc_id = aws_vpc.main_vpc.id 
  route { 
    cidr_block = "0.0.0.0/0" 
    gateway_id = aws_internet_gateway.main_igw.id 
  } 
} 
resource "aws_route_table_association" "main_rta" { 
  subnet_id      = aws_subnet.main_subnet.id 
  route_table_id = aws_route_table.main_rt.id 
} 
resource "tls_private_key" "generated_key" { 
  algorithm = "RSA" 
  rsa_bits  = 2048 
} 
resource "aws_key_pair" "generated_key" { 
  key_name   = "generated-key" 
  public_key = tls_private_key.generated_key.public_key_openssh 
} 
# Save private key to a local file 
resource "local_file" "private_key" { 
  content  = tls_private_key.generated_key.private_key_pem
    filename = "generated-key.pem" 
} 
resource "aws_security_group" "allow_ssh" { 
  vpc_id = aws_vpc.main_vpc.id 
  ingress { 
    from_port   = 0 
    to_port     = 65535 
    protocol    = "tcp" 
    cidr_blocks = ["0.0.0.0/0"]  
  } 
   ingress { 
    from_port        = 8081 
    to_port          = 8081 
    protocol         = "tcp" 
    cidr_blocks      = ["0.0.0.0/0"] 
  } 
  egress { 
    from_port   = 0 
    to_port     = 0 
    protocol    = "-1" 
    cidr_blocks = ["0.0.0.0/0"] 
  } 
  tags = { 
    Name = "Allow ssh and 8081" 
  } 
} 
# EC2 Instance 
resource "aws_instance" "react_native_notes" { 
  ami           = var.ami_id 
  instance_type = var.instance_type 
  key_name      = aws_key_pair.generated_key.key_name 
  subnet_id     = aws_subnet.main_subnet.id 
  security_groups = [aws_security_group.allow_ssh.id] 
  provisioner "remote-exec" { 
    inline = [ 
      "sudo apt-get update -y", 
      "curl -fsSL https://get.docker.com -o install-docker.sh", 
      "sudo sh install-docker.sh", 
      "sudo docker info", 
      "git clone https://github.com/gopikrishnayakkati/react-native-notes
app.git", 
      "cd react-native-notes-app", 
      "ls -al", 
      "sudo docker build -t react-native-notes:1.0 .", 
      "sudo docker run -d -p 8081:8081 react-native-notes:1.0 ", 
      "sudo docker container ls -a" 
    ] 
    connection { 
      type        = "ssh"
      user        = "ubuntu" 
      private_key = file(local_file.private_key.filename) 
      host        = self.public_ip 
    } 
  } 
  tags = { 
    Name = "ReactNativeNotesAppInstance" 
  } 
} 
