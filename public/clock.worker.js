var SCMStime = new Date();
var SCMSspeed = 1; // 时间加速倍率,默认是1
var SCMSpause = false

function tick() {
  if(SCMSpause == false){
    SCMStime = new Date(new Date(SCMStime).getTime() + SCMSspeed * 100 );
    if(SCMStime.getDay() == 1){
      
      let startSCMStime = new Date(SCMStime.getFullYear(),SCMStime.getMonth(),SCMStime.getDate(),0,0,0);
      if(SCMStime.getTime() - startSCMStime.getTime() < 300){
          this.postMessage({
            time: SCMStime.getTime(),
            getdata:true
          });      
        }
      }else{
        this.postMessage({
          time: SCMStime.getTime(),
          getdata:false
        });
      }
  }

  setTimeout(tick, 100);
}

onmessage = function(message) {
  if(message.data == "start"){
    SCMStime = new Date();
    tick();
  }else{
    let getMessage = message.data;
    switch (parseInt(getMessage.type)) {
        case 0:
            // 速率,直接修改速率
            SCMSspeed = parseInt(getMessage.message);
            break;
        case 1:
            // 跳跃,直接修改时间
            SCMStime = new Date(new Date(SCMStime).getTime() + parseInt(getMessage.message) * 24 * 60 * 60 * 1000);
            this.postMessage({
              time: SCMStime.getTime(),
              getdata:false
            })
            break;
        case 2:
            // 暂停
            this.postMessage({
              time: SCMStime.getTime(),
              getdata:false
            })
            SCMSpause = !SCMSpause;
            break;
      }
  }
  
};