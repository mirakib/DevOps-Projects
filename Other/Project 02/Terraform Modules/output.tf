output "nginx_router_public_ip" {
  value = aws_instance.nginx_router.public_ip
}

output "web1_private_ip" {
  value = aws_instance.web1.private_ip
}

output "web2_private_ip" {
  value = aws_instance.web2.private_ip
}