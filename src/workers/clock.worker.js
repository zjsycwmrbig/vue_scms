export default function() {

  let lastTime = Date.now();
  let speed = 1; // 时间加速倍率,默认是1
  tick();
  onmessage = function(message) {
    console.log(message);
    if(message == "start"){
        tick();
    }else{
            // 接收主线程发送的消息
        switch (message.data.type) {
          case 0:
              // 速率,直接修改速率
              speed = message.data.message;
              break;
          case 1:
              // 跳跃,直接修改时间
              lastTime = message.data.message;
              break;
      }
    }
    
  };
  function tick() {
    let now = Date.now();
    let elapsed = (now - lastTime) * speed;
    lastTime = now;
    // 将 elapsed 作为消息发送给主线程
    postMessage(new Date(now + elapsed));
    setTimeout(tick, 1000);
  }
}
