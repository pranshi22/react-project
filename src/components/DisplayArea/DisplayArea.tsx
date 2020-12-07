import React from 'react'
import Image from '../Image/Image'
import InstanceType from '../InstanceType/InstanceType';
import ReviewAndLaunch from '../ReviewAndLaunch/ReviewAndLaunch'
import StorageAndNetwork from '../StorageAndNetwork/StorageAndNetwork';

export default function DisplayArea(props: {
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
    setStep: React.Dispatch<React.SetStateAction<number>>,
    region: string,
    regionsList: string[],
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
    setSelectedInstaces: React.Dispatch<React.SetStateAction<{
        tab: string;
        CPUvalue: string;
        CPUcost: number;
        memoryValue: string;
        memoryCost: number;
    }>>,
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
    setStorageCard: React.Dispatch<React.SetStateAction<{
        id: string;
        type: string;
        Volume: string;
        Capacity: number;
        Encryption: boolean;
        IOPS: number;
        BackupRequired: boolean;
        Remarks: string;
        cost: number;
    }[]>>,
    bandwidth: {
        value: number;
        cost: number;
    },
    setBandwidth: React.Dispatch<React.SetStateAction<{
        value: number;
        cost: number;
    }>>
}) {

    switch (props.step) {
        case 0:
            return (<Image step={props.step} images={props.images}
                setImages={props.setImages}
                region={props.region} regionsList={props.regionsList}
                setStep={props.setStep} pageNameList={props.pageNameList}
                imageCost={props.imageCost} setImageCost={props.setImageCost}
            />);
        case 1:
            return <InstanceType selectedInstaces={props.selectedInstaces}
                setSelectedInstaces={props.setSelectedInstaces} />
        case 2:
            return <StorageAndNetwork storageCard={props.storageCard} setStorageCard={props.setStorageCard}
                selectedTab={props.selectedInstaces.tab} bandwidth={props.bandwidth}
                setBandwidth={props.setBandwidth} imageCost={props.imageCost} setImageCost={props.setImageCost}
                step={props.step} />
        case 4:
            return (
                <ReviewAndLaunch step={props.step} images={props.images.filter((item) => item.state === true)}
                    setImages={props.setImages}
                    region={props.region} regionsList={props.regionsList}
                    setStep={props.setStep} pageNameList={props.pageNameList}
                    imageCost={props.imageCost} setImageCost={props.setImageCost}
                    selectedInstaces={props.selectedInstaces} storageCard={props.storageCard}
                    bandwidth={props.bandwidth} setStorageCard={props.setStorageCard}
                    setBandwidth={props.setBandwidth} />
            );
    }

    return (<div />)
}