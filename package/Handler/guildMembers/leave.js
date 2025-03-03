const Interpreter = require('../../interpreter.js')
module.exports = async (mem,client) =>{
    if(client.options.fetchInvites.enabled){
        client.inviteSystem.userLeft(mem)
    }
   let chan;
  const cmds = client.cmd.leave.allValues()
  let data = {guild:mem?.guild,author:mem?.user,member:mem,client:client}
  for(const cmd of cmds){
  if(cmd.channel?.includes("$")){
     const id = await Interpreter(client,data,[],{name:"ChannelParser",code:cmd.channel},client.db,true)
  chan = client.channels.cache.get(id?.code)
     }
   await Interpreter(client,data,[],cmd,client.db,false,chan?.id,{newm:mem},chan)
  }
}