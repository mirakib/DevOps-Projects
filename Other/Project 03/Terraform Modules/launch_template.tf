resource "aws_launch_template" "project_lt" {
  image_id      = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  user_data = base64encode(<<EOF
#!/bin/bash
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "Hello from ASG behind ALB" > /var/www/html/index.html
EOF
  )
}
