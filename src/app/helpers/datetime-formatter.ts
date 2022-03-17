import * as moment from 'moment';


export function DatetimeExpirationDiff(expirationDate:Date){
    const now = moment();
    const expiration = moment(expirationDate);
    
    // get the difference between the moments
    const diff = expiration.diff(now);
    
    //express as a duration
    const diffDuration = moment.duration(diff);
    
   // display
   let days=diffDuration.days()<=0?0:diffDuration.days();
   let hours=diffDuration.hours()<=0?0:diffDuration.hours();
   let minutes=diffDuration.minutes()<=0?0:diffDuration.minutes();
 
 
    let fullDate= `${days} gün ${hours} saat ${minutes} dakika `;

    return fullDate;

}


export function DatetimeNowDiff (expirationDate:Date){
    const now = moment();
    const expiration = moment(expirationDate);
    
    // get the difference between the moments
    const diff = now.diff(expiration);
    
    //express as a duration
    const diffDuration = moment.duration(diff);
    
    // display
    let days=diffDuration.days()<=0?0:diffDuration.days();
    let hours=diffDuration.hours()<=0?0:diffDuration.hours();
    let minutes=diffDuration.minutes()<=0?0:diffDuration.minutes();
 
 
    let fullDate= `${days} gün ${hours} saat ${minutes} dakika `;

    return fullDate;

}