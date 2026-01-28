output "instance_public_ip" { 
  description = "Public IP of the instance" 
  value       = aws_instance.react_native_notes.public_ip 
}
