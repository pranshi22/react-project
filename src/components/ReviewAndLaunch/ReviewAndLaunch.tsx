import React from 'react';
import Image from '../Image/Image'
import "./ReviewAndLaunch.css"

function ReviewAndLaunch(props: {
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
    setImageCost: React.Dispatch<React.SetStateAction<number>>,
    selectedInstaces: {
        tab: string;
        CPUvalue: string;
        CPUcost: number;
        memoryValue: string;
        memoryCost: number;
    },
    storageCard: {
        id: string;
        type: string;
        Volume: string;
        Capacity: number;
        Encryption: boolean;
        IOPS: number;
        BackupRequired: boolean;
        Remarks: string;
        cost: number;
    }[],
    bandwidth: {
        value: number;
        cost: number;
    },
}) {
    return (
        <div className="review-and-launch">
            <div className="image-header">
                <label className="cat-label">Image</label>
                <label className="edit-label" onClick={() => props.setStep(0)}>EDIT</label>
            </div>
            {console.log(props.images)}
            <Image images={props.images} 
            setImages={props.setImages}
            step={props.step} 
            region={props.region}
            regionsList = {props.regionsList}
            setStep = {props.setStep} pageNameList={props.pageNameList}
            imageCost={props.imageCost} setImageCost={props.setImageCost}
            />
            <div className="instance-header">
                <label className="cat-label">Instance</label>
                <label className="edit-label" onClick={() => props.setStep(1)}>EDIT</label>
            </div>
            <div className="instance-details">
                <label className="instance-name">General Purpose</label>
                <label className="ins-items">{props.selectedInstaces.CPUvalue.split("")[0]} CPU</label>
                <label className="ins-items">{props.selectedInstaces.memoryValue.split("")[0]} RAM</label>
                <label className="ins-items">Moderate Network Performance</label>
            </div>
            <div className="instance-header">
                <label className="cat-label">Bandwidth</label>
                <label className="edit-label" onClick={() => props.setStep(1)}>EDIT</label>
            </div>
        </div>
    )
}

export default ReviewAndLaunch;