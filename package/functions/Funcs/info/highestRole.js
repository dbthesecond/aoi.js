module.exports = async d => {
    const data = d.util.openFunc( d );
    
    const [ userId = d.author?.id,guildId = d.guild?.id,option = 'id' ] = data.inside.splits;
    
    const guild =await d.util.getGuild( d,guildId );
    if( !guild ) return d.aoiError.fnError( d,'guild',{ inside : data.inside });
    
    const member = await d.util.getMember( d,userId );
    if( !member ) return d.aoiError.fnError( d,'member',{ inside : data.inside });
    
    data.result = option === "mention" ? member.roles.highest.toString() : member.roles.highest[ option ];
    
    return {
        code : d.util.setCode( data )
    }
}