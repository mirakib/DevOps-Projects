output "web_instance_public_ip" {
value = aws_instance.web.public_ip
}

output "monitoring_instance_public_ip" {
value = aws_instance.monitoring.public_ip
}
