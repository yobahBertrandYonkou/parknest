terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
    }
  }
}

# specifying provider
provider "aws" {
    region = "ap-south-1"
    profile = "parknest"
}

# creating security group
resource "aws_security_group" "parknest_sg" {
  name = "parknest-sg"
  description = "Allows all inbound traffic and all tcp outbound traffic."
  vpc_id = "vpc-0f60092ddfb9a38c1"

  ingress {
    description = "Allow all incomming tcp ports."
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outgoing tcp ports."
    from_port = 0
    to_port = 0
    protocol = "all"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_all_tcp"
  }
}

# creating private key
resource "tls_private_key" "parknest_rsa_key" {
  algorithm = "RSA"
  rsa_bits = 4096
}

# Creating key pair for parknest
resource "aws_key_pair" "parknest_key" {
  key_name = "parknest-key"
  public_key = tls_private_key.parknest_rsa_key.public_key_openssh

  # Saving key to local host
  provisioner "local-exec" {
    command = <<-EOF
       echo '${tls_private_key.parknest_rsa_key.private_key_pem}' > ./parknest_key.pem
       chmod 400 ./parknest_key.pem
    EOF
    
  }
}

# Creating EC2 instance
resource "aws_instance" "parknest_production_server" {
  depends_on = [ aws_security_group.parknest_sg ]
      
  ami = "ami-099b3d23e336c2e83"
  # ami = "ami-008b85aa3ff5c1b02"
  instance_type = "c5a.large"
  key_name = aws_key_pair.parknest_key.key_name
  security_groups = [ aws_security_group.parknest_sg.name ]
  user_data = "${file("user_data.sh")}"

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
      "Name" = "parknest-deployment-server"
  }
}

output "print_url" {
  value = "http://${aws_instance.parknest_production_server.public_dns}"
}