<template>
<div class="computers">
  <h1 class="cga-yellow">Psikon Network</h1>
  <div class="computers-list">
    <div v-for="(computer, idx) in computers" class="computer" :key="computer.hostname" :class="{error: bad_computers[computer.hostname]}">
      <div class="computer-header">
        <h2 v-if="bad_computers[computer.hostname] === false">
          <typer :content="computer.hostname"></typer>
        </h2>

        <h2 v-else>
          <span class="cga-bright-red">!! {{ computer.hostname }} !!</span>
        </h2>

        <div class="computer-ip-addrs" v-if="bad_computers[computer.hostname] === false && computer_ip_addrs[idx].iface">
          <div class="iface">
            <typer :content="computer_ip_addrs[idx].iface" class="cga-light-green"/>
          </div>
          <div class="ipaddr">
            <typer :content="computer_ip_addrs[idx].addrs" v-if="computer_ip_addrs[idx].addrs" class="cga-light-blue"/>
            <typer content="DISCONNECTED" class="cga-light-red" v-else/>
          </div>
        </div>
      </div>
      <ComputerMeter v-model="computer.cpu" label="CPU"/>
      <ComputerMeter v-model="computer.mem" label="MEM"/>
      <!-- <cpu-graph v-model="computer.cpu" :id="'graph-' + computer.hostname" v-if="bad_computers[computer.hostname] === false"/>-->
    </div>
  </div>
</div>
</template>

<style lang="scss">

@import '@/sass/standards.scss';
@import '@/sass/cga-display.scss';
@import '@/sass/colours.scss';

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

@keyframes bg-blinker {
  50% {
    background: rgba(96,0,0,0.0);
  }
}

.computers-list {
  color: white;
  margin-top: 1rem;
}

.error {
  background: rgba(96,0,0,1);
  animation: bg-blinker 1s linear infinite;
}

.computer {
  min-height: 5rem;
  display: flex;
  flex-flow: row;

  .computer-header {
    display: flex;
    width: 50%;
    flex-flow: column;

    .iface {
      color: $cga-light-blue;
      font-size: 16pt;
    }

    .ipaddr {
      color: $cga-light-green;
      font-size: 24pt;
    }
  }

  h2 {
    color: $cga-light-magenta;
    margin: 0; padding: 0;
    font-size: 32pt;
  }
}
</style>

<script lang="ts">

import Typer from '@/components/Typer.vue';
import CpuGraph from '@/components/CpuGraph.vue';
import ComputerMeter from '@/components/Meter.vue';
import {Vue, Component} from 'vue-property-decorator';

interface Message {
  hostname: String,
  sender: String,
  message: any
};

@Component({
  components: {
    Typer,
    CpuGraph,
    ComputerMeter
  },
  mqtt: {
    "psistats2/#"(this: ComputersComponent, msg: any) {
      msg = JSON.parse(msg.toString());
      this.process_message(msg);
    }
  }
})
class ComputersComponent extends Vue {

  private computer_cache: { [key: string]: number };
  private computer_last_msg: Array<any>;
  private computer_ip_addr_idx: { [key: string]: any };
  private computer_timers: { [key: string]: number };

  computers = new Array<any>();
  computer_ip_addrs = new Array<any>();
  bad_computers = {};

  constructor(...args: any[]) {
    super(...args);
    this.computer_cache = {};
    this.computer_last_msg = [];
    this.computer_ip_addr_idx = {};
    this.computer_timers = {
      ip_addresses: -1,
      heartbeat: -1
    };
  }


  remove_computer(hostname: string) {
    const idx = this.computer_cache[hostname];
    this.computers.splice(idx, 1);
    this.computer_ip_addrs.splice(idx, 1);

    delete this.bad_computers[hostname];
    delete this.computer_ip_addr_idx[hostname];
    delete this.computer_last_msg[hostname];
    delete this.computer_cache[hostname];
  }

  rotate_ip_addresses() {
    for (var i = 0; i < this.computers.length; i++) {
      var c = this.computers[i];
      if (this.computer_ip_addr_idx[c.hostname] >= c.ip_addrs.length) {
        this.computer_ip_addr_idx[c.hostname] = 0;
      }

      var iface = '';

      if (c.ip_addrs[this.computer_ip_addr_idx[c.hostname]]) {
        let ipaddr = c.ip_addrs[this.computer_ip_addr_idx[c.hostname]];
        this.computer_ip_addrs[i] = {};

        if (ipaddr.iface) {
          this.computer_ip_addrs[i]['iface'] = ipaddr.iface;
        } else {
          this.computer_ip_addrs[i]['iface'] = ' ';
        }

        if (ipaddr.addrs) {
          this.computer_ip_addrs[i]['addrs'] = ipaddr.addrs;
        } else {
          this.computer_ip_addrs[i]['addrs'] = null;
        }

      } else {
        this.computer_ip_addrs[i] = {
          iface: '',
          addrs: ''
        };
      }

      this.computer_ip_addr_idx[c.hostname]++;
    }
  }

  heartbeat() {
    console.log('heartbeat');

    const now = Date.now();

    for (var i = 0; i < this.computers.length; i++) {
      const hostname = this.computers[i].hostname;

      let last = this.computer_last_msg[hostname];
      let interval = now - last;

      if (interval > 3600000) {
        this.remove_computer(hostname);
      } else if (interval > 5000) {
        this.bad_computers[hostname] = true;
      } else {
        this.bad_computers[hostname] = false;
      }

    }
  }

  process_message(msg: any) {
    if (!this.computer_cache.hasOwnProperty(msg.hostname)) {
      this.computer_cache[msg.hostname] = this.computers.length;

      const responsive = {
        hostname: msg.hostname
      };

      this.$set(responsive, 'cpu', 0);
      this.$set(responsive, 'ip_addrs', []);
      this.$set(responsive, 'mem', 0);
      //this.$set(this.computer_ip_addrs, msg.hostname, '');
      this.computers.push(responsive);
      this.computer_ip_addrs.push('');
      this.computer_ip_addr_idx[msg.hostname] = 0;

      this.$set(this.bad_computers, msg.hostname, false);

      if (this.computer_timers.ip_addresses === -1) {
        console.log('Set Interval for ip addresses');
        this.computer_timers.ip_addresses = window.setInterval(() => {
          this.rotate_ip_addresses();
        }, 5000);
      }

      if (this.computer_timers.heartbeat === -1) {
        console.log('Set interval for heartbeat');
        this.computer_timers.heartbeat = window.setInterval(() => {
          this.heartbeat();
        },5000);
      }
    }

    if (msg.sender === 'cpu_total') {
      this.computers[this.computer_cache[msg.hostname]].cpu = msg.message;
    } else if (msg.sender === 'ip_addr') {
      this.computers[this.computer_cache[msg.hostname]].ip_addrs = msg.message;
    } else if (msg.sender === 'mem') {
      this.computers[this.computer_cache[msg.hostname]].mem = 100 - (msg.message[1] / msg.message[0]) * 100;
    }

    this.computer_last_msg[msg.hostname] = Date.now();
  }

  beforeDestroy() {
    Object.keys(this.computer_timers).forEach((timerName) => {
      if (this.computer_timers[timerName]) {
        clearInterval(this.computer_timers[timerName]);
      }
    });
  }
}

export default ComputersComponent;
</script>