#!/usr/bin/env python3

from mininet.net import Mininet
from mininet.node import OVSBridge
from mininet.cli import CLI
from mininet.log import setLogLevel, info
import time

def run_experiment():

    # 1. Initialize Mininet with NO controller
    net = Mininet(controller=None)
    # Write your name and rollnumber 
    info('vamsikrishna cs23b023')
    info('*** Adding hosts\n')
    h1 = net.addHost('h1')
    h2 = net.addHost('h2')
    # Add third host h3
    h3 = net.addHost('h3')
    # Adding host h4
    h4 = net.addHost('h4')

    # 2. Add switch as an OVSBridge (Standalone L2 Switch)
    info('*** Adding switch (Standalone mode)\n')
    s1 = net.addSwitch('s1', cls=OVSBridge)

    info('*** Creating links\n')
    net.addLink(h1, s1)
    net.addLink(h2, s1)
    #Link h3 to switch s1
    net.addLink(h3, s1)
    #Linking h4 to switch s1
    net.addLink(h4, s1)

    info('*** Starting network\n')
    net.start()

    info('\n*** Host Information:\n')
    for host in net.hosts:
        info(f"{host.name}: IP={host.IP()}, MAC={host.MAC()}\n")
    #Verify all 3 hosts ip and MAC addresses are listed when mininet loads 
    info('\n*** Starting Python HTTP server on h2 (Port 8000)...\n')
    h2.cmd('python3 -m http.server 8000 &')
    time.sleep(1)

    #Write a statement to list iptable rules of host h1
    info(h1.cmd('iptables -L'))
    info(h1.cmd('iptables -A OUTPUT -p tcp --dport 8000 -d 10.0.0.2 -j DROP'))
    info(h3.cmd('iptables -A OUTPUT -p icmp -d 10.0.0.2 -j DROP'))
    info(h3.cmd('iptabls -A OUTPUT -p tcp --dport 8000 -d 10.0.0.2 -j ACCEPT'))
    info(h4.cmd('iptables -A OUTPUT -p icmp -d 10.0.0.2 -j DROP'))
    info(h4.cmd('iptables -A OUTPUT -p tcp --dport 8000 -d 10.0.0.2 -j DROP'))
    info('\n*** Entering CLI.\n')
    info('*** Try "h3 ping -c 3 h1".\n')
    info('*** Try "h3 ping -c 3 h2".\n')
    info('*** Try "h3 curl ....".\n')
    CLI(net)

    info('\n*** Stopping network and cleaning up services...\n')
    h2.cmd('pkill -9 -f "python3 -m http.server"')
    h1.cmd('iptables -F')
    
    net.stop()
    info('*** Cleanup complete. Exiting.\n')

if __name__ == '__main__':
    setLogLevel('info')
    run_experiment()
