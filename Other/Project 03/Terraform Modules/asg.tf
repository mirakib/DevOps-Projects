resource "aws_autoscaling_group" "asg" {
  min_size         = 2
  max_size         = 6
  desired_capacity = 2

  vpc_zone_identifier = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  target_group_arns = [aws_lb_target_group.web_tg.arn]

  launch_template {
    id      = aws_launch_template.project_lt.id
    version = "$Latest"
  }
}
