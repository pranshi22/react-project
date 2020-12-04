import React from 'react';
import './Image.css'

function Image(props:{
    images: {id: string, name: string, desc: string, type: string, state: boolean}[], 
    setImages: any,
    setproceedDisable:any,
    hidden: boolean    
}) {

    const imageType = [
        { value: "86", name: "X86" },
        { value: "arm", name: "ARM" }
    ]

    function updateState(id: string){
        props.setImages(() => {
            let image = [...props.images];
            image.forEach(element => {
                element.id === id ? element.state = true : element.state = false;
            });
            props.setproceedDisable(false);
            return image;
        })
    }

    return(
        <div hidden={props.hidden} className="image-container">
            {props.images.map(imageItem => {
                return (
                    <div className="image-cards" key={"main"+imageItem.id}>
                        <div className="blank-box"></div>
                        <div className="image-details">
                            <label className="image-name">{imageItem.name}</label>
                            <label className="image-desc">{imageItem.desc}</label>
                        </div>
                        <div>
                            {imageType.map(typeItem =>
                                <div className="type-radio">
                                    <input type="radio" value={typeItem.value} defaultChecked={typeItem.value===imageItem.type} name={imageItem.id} key={"type"+imageItem.id}/>64-bit ({typeItem.name})
                                </div>
                            )}
                            <button className="select-image" onClick={() => updateState(imageItem.id)}>Select</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Image;