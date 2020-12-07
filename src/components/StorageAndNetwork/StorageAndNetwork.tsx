import React from 'react';
import './StorageAndNetwork.css'

function StorageAndNetwork(props: {
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
    selectedTab: string,
    bandwidth: {
        value: number;
        cost: number;
    },
    setBandwidth: React.Dispatch<React.SetStateAction<{
        value: number;
        cost: number;
    }>>,
    imageCost: number,
    setImageCost: React.Dispatch<React.SetStateAction<number>>,
    step: number
}) {

    function onAddHandler(e: any) {
        let newVolume = {
            id: "storage" + String(props.storageCard.length + 1),
            type: "",
            Volume: "Ext",
            Capacity: 20,
            Encryption: false,
            IOPS: 0,
            BackupRequired: false,
            Remarks: "",
            cost: 0
        }

        props.setStorageCard([...props.storageCard, newVolume])
    }

    function InputChangeHandler(e: any, id: string) {
        props.setStorageCard(() => {
            let storageCardClone = [...props.storageCard]
            storageCardClone.forEach(element => {
                if (element.id === id) {
                    if (e.target.name === "capacity") {
                        if (element.type === "") {
                            alert("Please choose the type first");
                        }
                        else {
                            element.Capacity = parseInt(e.target.value);
                        }
                        if (element.Capacity < 100) {
                            element.IOPS = 100;
                        }
                        else if (element.Capacity >= 100 && element.Capacity <= 500) {
                            element.IOPS = 600;
                        }
                        else if (element.Capacity > 500) {
                            element.IOPS = 1000;
                        }
                    }
                    else if (e.target.name === "remarks") {
                        element.Remarks = e.target.value;
                    }

                }
            });
            return storageCardClone;
        }
        )
    }

    function TypeChangeHandler(e: React.ChangeEvent<HTMLSelectElement>, id: string) {
        props.setStorageCard(() => {
            let storageCardClone = [...props.storageCard]
            storageCardClone.forEach(element => {
                if (element.id === id) {
                    if (element.Capacity > 512 && e.target.value === "SSD") {
                        alert(e.target.value + " is not available for SSD. Its limit is upto 512 GB");
                    }
                    else {
                        element.type = e.target.value;
                        if (e.target.value === "Magnetic Disks") {
                            element.cost = 20;
                            if (element.Capacity === 20) {
                                element.Capacity = 40;
                            }
                        }
                        else if (e.target.value === "SSD") {
                            element.cost = 40;
                        }
                    }
                    let totalCost = props.imageCost + element.cost;
                    props.setImageCost(totalCost);
                }
            });
            return storageCardClone;
        })
    }

    function CheckboxChangeHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
        props.setStorageCard(() => {
            let storageCardClone = [...props.storageCard];
            props.storageCard.forEach((element, index) => {
                if (element.id === id) {
                    let elementObjClone = { ...element };
                    if (e.target.name === "encryption") {
                        elementObjClone.Encryption = !element.Encryption;
                    }
                    else if (e.target.name === "backupRequired") {
                        elementObjClone.BackupRequired = !element.BackupRequired;
                    }
                    storageCardClone[index] = elementObjClone;
                }
            });
            return storageCardClone;
        });
    }

    function deleteVolume(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
        props.storageCard.forEach(element => {
            if (element.id === id) {
                props.setImageCost(props.imageCost - element.cost);
            }
        });
        props.setStorageCard(props.storageCard.filter((elem) => elem.id !== id));
    }

    function onRangeChange(e: any) {
        props.setBandwidth(() => {
            let bandwidthClone = { ...props.bandwidth };
            bandwidthClone.value = e.target.value;
            if (e.target.value >= 512 && e.target.value < 1000) {
                bandwidthClone.cost = 5;
            }
            else if (e.target.value >= 512 && e.target.value < 1500) {
                bandwidthClone.cost = 10;
            }
            else if (e.target.value >= 1500) {
                bandwidthClone.cost = 15;
            }
            return bandwidthClone;
        })
    }

    return (
        <div className={props.step === 4 ? "margin vol-main-conatiner" : "vol-main-conatiner"}>
            {props.storageCard.map((storage, index) => {
                return (
                    <div className="storage-cont">
                        <div className="storage-and-network-container">
                            <div>
                                <label className="label">Type</label>
                                <select onChange={(e) => TypeChangeHandler(e, storage.id)} className="select-type" name="type-dd" value={storage.type === "" ? "Storage" : storage.type}>
                                    <option hidden={true}>Storage</option>
                                    <option value="SSD">SSD</option>
                                    <option value="Magnetic Disks">Magnetic Disks</option>
                                </select>
                            </div>
                            <div className="item-holder">
                                <label className="label">Volume</label>
                                <label className="root">{storage.Volume}</label>
                            </div>
                            <div className="item-holder">
                                <label className="label">Capacity (GB)</label>
                                <input disabled={index === 0 ? true : false} onChange={(e) => InputChangeHandler(e, storage.id)} className="input" type="number" value={storage.Capacity} name="capacity" />
                            </div>
                            <div className="item-holder">
                                <label className="label">Encryption</label>
                                <input onChange={(e) => CheckboxChangeHandler(e, storage.id)} className="enc-class" type="checkbox" name="encryption" id={"enc" + storage.id} checked={storage.Encryption} />
                            </div>
                            <div className="item-holder">
                                <label className="label">IOPS</label>
                                <label className="iops">{storage.IOPS}</label>
                            </div>
                            <div className="item-holder">
                                <label className="label">Backup Required</label>
                                <input onChange={(e) => CheckboxChangeHandler(e, storage.id)} className="enc-class" type="checkbox" name="backupRequired" id={"enc" + storage.id} checked={storage.BackupRequired} />
                            </div>
                            <div className="item-holder">
                                <label className="label">Remarks</label>
                                <input onChange={(e) => InputChangeHandler(e, storage.id)} className="input" type="text" placeholder="Some remarks" name="remarks" />
                            </div>
                        </div>
                        <button className={index === 0 || props.step === 4 ? "display del-vol" : "del-vol"} onClick={(e) => deleteVolume(e, storage.id)}>X</button>
                    </div>
                )
            })}
            <div className={props.step === 4 ? "display" : ""}>
                <button className="add-vol" onClick={onAddHandler}>Add Volume</button>
                <h1 className="bandwith-label">Network Bandwith Configuration</h1>
                <div className="slidecontainer">
                    <p>Outbound Traffic</p>
                    <input onChange={(e) => onRangeChange(e)} type="range" min="512" max={props.selectedTab === "Network Optimised" ? "2000" : "1000"} className="slider" id="myRange" value={props.bandwidth.value}/>
                    <div className="range-label">
                        <label>512 GB</label>
                        <label>{props.selectedTab === "Network Optimised" ? "2TB" : "1TB"}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorageAndNetwork;