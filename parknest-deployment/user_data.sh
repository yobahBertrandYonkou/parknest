#! /bin/bash

# installation of git
sudo yum install git -y

# installation of npm (nodejs)
sudo yum install npm -y

# update npm
num install -g npm@9.8.1

# adding (downloading) repository information to file created above
sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo<<EOL
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOL

# installation of mongodb
sudo yum install mongodb-mongosh-shared-openssl3 -y
sudo yum install mongodb-org -y

# starting and enabling mongodb
sudo systemctl start mongod --now

# cloning of repository
sudo -u ec2-user git clone https://github.com/yobahBertrandYonkou/parknest.git /home/ec2-user/parknest

# installation of npm packages
sudo npm --prefix /home/ec2-user/parknest install

# changing parknest owner to root user
sudo chown root /home/ec2-user/parknest/  -R

# starting react server
sudo PORT=80 npm --prefix /home/ec2-user/parknest run dev