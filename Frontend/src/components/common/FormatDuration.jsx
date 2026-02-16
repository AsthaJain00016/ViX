export const FormatDuration=(seconds)=>{
    const totalSeconds=Math.floor(seconds);

    const hrs=Math.floor(totalSeconds/3600)
    const mins=Math.floor((totalSeconds%3600)/60)
    const secs=totalSeconds%60

    if(hrs>0){
        return `${hrs}:${mins.toString().padStart(2,'0')}:${
            secs.toString().padStart(2,'0')
        }`;
    }

    return `${mins}:${secs.toString().padStart(2,'0')}`
}