import React from 'react';
import Image from '../Image/Image'

function ReviewAndLaunch(props:{
    image: {id: string, name: string, desc: string, type: string, state: boolean},
    setImages: any,
    setproceedDisable:any,
    hidden: boolean
}) {
    return(
        <div>
            <Image images={[props.image]} setImages={props.setImages} setproceedDisable={props.setproceedDisable} hidden={false}/>
        </div>
    )
}

export default ReviewAndLaunch;