resource "aws_launch_template" "project_lt" {
  image_id      = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  user_data = base64encode(<<EOF
#!/bin/bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
echo "Hello from Nginx web server." > /var/www/html/index.html
EOF
  )
}
