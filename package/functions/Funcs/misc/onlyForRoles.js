module.exports = async d => {
    const data = d.util.openFunc(d);
    if (data.err) return d.error(data.err);
    let error = false;

    const [...stuffs] = data.inside.splits;
    const errorMsg = await d.util.errorParser(stuffs.pop(), d);

    if (!stuffs.some(x => d.member._roles.includes(x))) {
        error = true;
        if(typeof errorMsg.content === 'string' && errorMsg.content.trim() === ''){}
        else  d.aoiError.makeMessageError(d.client, d.channel, errorMsg, errorMsg.options,d);
    }

    return {
        code: d.util.setCode(data),
        error
    }
}