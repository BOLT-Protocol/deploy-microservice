Vagrant.configure("2") do |config|
  # bolt_main config
  config.vm.define :bolt_main do |bolt_main_config|
    bolt_main_config.vm.box = "bento/ubuntu-18.04"
    bolt_main_config.vm.network "forwarded_port", guest: 22, host: 2222, id: "ssh"
    bolt_main_config.vm.network "forwarded_port", guest: 80, host: 80
    bolt_main_config.vm.network "private_network", ip: "192.168.50.4"
  end

  # bolt_microservice config
  config.vm.define :bolt_microservice do |bolt_microservice_config|
    bolt_microservice_config.vm.box = "bento/ubuntu-18.04"
    bolt_microservice_config.vm.network "forwarded_port", guest: 22, host: 2223, id: "ssh"
    bolt_microservice_config.vm.network "forwarded_port", guest: 3000, host: 3000
    bolt_microservice_config.vm.network "forwarded_port", guest: 5999, host: 5999
    bolt_microservice_config.vm.network "forwarded_port", guest: 5566, host: 5566
    bolt_microservice_config.vm.network "forwarded_port", guest: 5567, host: 5567
    bolt_microservice_config.vm.network "forwarded_port", guest: 3333, host: 3333
    bolt_microservice_config.vm.network "private_network", ip: "192.168.50.5"
  end

  # howinvest_microservice config
  config.vm.define :howinvest_microservice do |howinvest_microservice_config|
    howinvest_microservice_config.vm.box = "bento/ubuntu-18.04"
    howinvest_microservice_config.vm.network "forwarded_port", guest: 22, host: 2224, id: "ssh"
    howinvest_microservice_config.vm.network "forwarded_port", guest: 5669, host: 5669
    howinvest_microservice_config.vm.network "forwarded_port", guest: 5668, host: 5668
    howinvest_microservice_config.vm.network "private_network", ip: "192.168.50.6"
  end

  # # server config
  # config.vm.define :server do |server_config|
  #   server_config.vm.box = "bento/ubuntu-18.04"
  #   server_config.vm.network "forwarded_port", guest: 8546, host: 8546
  #   server_config.vm.network "forwarded_port", guest: 3000, host: 3000
  #   server_config.vm.network "forwarded_port", guest: 5999, host: 5999
  #   server_config.vm.network "forwarded_port", guest: 5566, host: 5566
  #   server_config.vm.network "forwarded_port", guest: 5567, host: 5567
  #   server_config.vm.network "forwarded_port", guest: 3333, host: 3333
  #   server_config.vm.network "forwarded_port", guest: 5432, host: 5432
  #   server_config.vm.network "forwarded_port", guest: 5669, host: 5669
  #   server_config.vm.network "forwarded_port", guest: 5668, host: 5668
  #   server_config.vm.network "forwarded_port", guest: 80, host: 80
  # end
end