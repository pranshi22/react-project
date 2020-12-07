import React from 'react';
import './Image.css'

function Image(props: {
    images: {
        id: string,
        name: string,
        desc: string,
        type: string,
        state: boolean,
        cost: number
    }[],
    setImages: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
        desc: string;
        type: string;
        state: boolean;
        cost: number;
    }[]>>,
    step: number,
    region: string,
    regionsList: string[],
    setStep: React.Dispatch<React.SetStateAction<number>>,
    pageNameList: string[],
    imageCost: number,
    setImageCost: React.Dispatch<React.SetStateAction<number>>
}) {

    const imageType = [
        { value: "86", name: "X86" },
        { value: "arm", name: "ARM" }
    ];

    function updateState(id: string, cost: number) {
        if (props.region === "Region") {
            alert("Please choose the region first");
        }
        else {
            props.setImages(() => {
                let image = [...props.images];
                image.forEach(element => {
                    element.id === id ? element.state = true : element.state = false;
                });
                return image;
            })
            props.setStep(props.step + 1);
            props.setImageCost(cost);
        }
    }

    function radioSelectHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
        props.setImages(() => {
            let image = [...props.images];
            image.forEach(element => {
                if (element.id === id) {
                    element.type = e.target.value
                }
            });
            return image;
        })
    }

    return (
        <div className={props.step === props.pageNameList.length - 1 ? "ral image-container" : "image-container"}>
            {props.images.map(imageItem => {
                if (props.region !== props.regionsList[0] && props.region !== props.regionsList[1]) {
                    if (imageItem.name.toLowerCase().includes("windows")) {
                        return null;
                    }
                }
                return (
                    <div className="image-cards" key={"main" + imageItem.id} role={imageItem.id}>
                        <div className="blank-box" key={"box" + imageItem.id}></div>
                        <div className="image-details" key={"detail" + imageItem.id}>
                            <label className="image-name" key={"name" + imageItem.id}>{imageItem.name}</label>
                            <label className="image-desc" key={"desc" + imageItem.id}>{imageItem.desc}</label>
                        </div>
                        <div>
                            {(imageItem.name.toLowerCase().includes("windows") || (props.step === props.pageNameList.length - 1)) ? (<div className="type-label" key={"label" + imageItem.id}><label>64-bit ({imageItem.type.toUpperCase()})</label></div>) : (imageType.map(typeItem =>
                                <div className="type-radio" key={"type-radio" + typeItem.value}>
                                    <input onChange={(e) => radioSelectHandler(e, imageItem.id)} type="radio" value={typeItem.value} defaultChecked={typeItem.value === imageItem.type} name={imageItem.id} key={"type" + imageItem.id} />64-bit ({typeItem.name})
                                </div>))}
                            <button key={"btn" + imageItem.id} className={props.step === props.pageNameList.length - 1 ? "display select-image" : "select-image"} onClick={() => {
                                updateState(imageItem.id, imageItem.cost);
                            }
                            }>Select</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Image;