import React, { useState } from 'react';
import './Common.css'
import DisplayArea from '../DisplayArea/DisplayArea';
import InstanceType from '../InstanceType/InstanceType';

function Common() {

    const [images, setImages] = useState([
        {
            id: "id1",
            name: "Linux 2 Image",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false,
            cost: 243.61
        },
        {
            id: "id2",
            name: "Ubuntu Server 18.04 LTS",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false,
            cost: 243.61
        },
        {
            id: "id3",
            name: "Redhat Enterprise Linux 8",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false,
            cost: 300
        },
        {
            id: "id4",
            name: "Microsoft Windows Server 2019 Base",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "arm",
            state: false,
            cost: 338.77
        },
        {
            id: "id5",
            name: "SUSE Linux Enterprise Server",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false,
            cost: 200.22
        }
    ]);

    const [storageCard, setStorageCard] = useState([{
        id: "storage1",
        type: "SSD",
        Volume: "Root",
        Capacity: 120,
        Encryption: true,
        IOPS: 600,
        BackupRequired: true,
        Remarks: "",
        cost: 0
    }
    ]);

    const [bandwidth, setBandwidth] = useState({
        value: 0,
        cost: 0
    })

    const [selectedInstaces, setSlectedInstaces] = useState({
        tab: "",
        CPUvalue: "",
        CPUcost: 0,
        memoryValue: "",
        memoryCost: 0
    })

    const [step, setStep] = useState(0);

    const [imageCost, setImageCost] = useState(0.00);

    const regions = ["US-East-1", "US-East-2", "US-West-1", "India-1"];

    const [region, setRegion] = useState("Region");

    const pageName = [
        "Choose Image",
        "Choose Instance Type",
        "Choose Storage and Network",
        "Configure Security",
        "Review & Launch"
    ];

    function onChangeRegion(e: any) {
        e.preventDefault();
        let image = images.filter(item => item.name.toLowerCase().includes("windows"))
        let confirmation = true
        let error
        if (image[0].state === true && (e.target.value !== regions[0] && e.target.value !== regions[1])) {
            confirmation = window.confirm("Windows is only available in " + region + ". If you proceed you may lose data")
            error = true
        }
        else {
            error = false
        }
        if (confirmation) {
            setRegion(e.target.value);
            if (error) {
                setImageCost(0.0);
                setStep(0);
                setImages(() => {
                    let image = [...images];
                    image.forEach(element => {
                        if (element.state === true) {
                            element.state = false;
                        }
                    });
                    return image;
                });
            }

        }
    }

    return (
        <div className="common-module">
            <header><h1 className="header-elem" role="head">HVC</h1></header>
            <div className="main-container">
                <div>
                    <label className="page-name" role="page-name-elem">{pageName[step]}</label>
                    <div className="changing-div">
                        <div className="tab-container" role="page-tabs">
                            {pageName.map((value, index) => <div key={value} className={step === index ? "active tabs" : "tabs"}>
                                {String(index + 1) + ". " + value}
                            </div>
                            )}
                        </div>
                        <DisplayArea step={step} setStep={setStep}
                            region={region} regionsList={regions}
                            pageNameList={pageName} images={images}
                            setImages={setImages} imageCost={imageCost}
                            setImageCost={setImageCost}
                            selectedInstaces={selectedInstaces} setSelectedInstaces={setSlectedInstaces}
                            storageCard={storageCard} setStorageCard={setStorageCard}
                            bandwidth={bandwidth} setBandwidth={setBandwidth} />
                    </div>
                </div>
                <select className="select-region" onChange={onChangeRegion} role="region-select" value={region}>
                    <option hidden={true} className="option-region">Region</option>
                    {regions.map((selRegion, index) => {
                        return <option className="option-region" key={index} value={selRegion}>{selRegion}</option>;
                    })}
                </select>
                <div className="cost-card" role="cost-box">
                    <label className="cost-heading">Cost Estimates</label>
                    {images.filter((item) => item.state === true).map((item) => {
                        return (<div className="pricing-item">
                            <label key={item.name}>{item.name}</label>
                            <label key={item.cost}>${item.cost}</label>
                        </div>)
                    })}
                    <div className={selectedInstaces.CPUvalue === "" ? "display" : "cost-style pricing-item"}>
                        <label>CPU - {selectedInstaces.CPUvalue}</label>
                        <label>${selectedInstaces.CPUcost}</label>
                    </div>
                    <div className={selectedInstaces.memoryValue === "" ? "display" : "cost-style pricing-item"}>
                        <label>Memory - {selectedInstaces.memoryValue}</label>
                        <label>${selectedInstaces.memoryCost}</label>
                    </div>
                    {storageCard.filter((elem) => elem.Volume !== "Root").map((volume, index) => {
                        return (
                            <div className={volume.cost === 0 ? "display" : "cost-style pricing-item"}>
                                <label>Volume - {index + 1} {volume.type}</label>
                                <label>${volume.cost}</label>
                            </div>
                        )
                    })}
                    <div className={bandwidth.value === 0 ? "display" : "cost-style pricing-item"}>
                        <label>Bandwidth - {bandwidth.value < 1000 ? bandwidth.value + "GB" : bandwidth.value / 1000 + "TB"}</label>
                        <label>${bandwidth.cost}</label>
                    </div>
                    <hr className="cost-seperator" />
                    <label className="total-cost" >${imageCost + selectedInstaces.CPUcost + selectedInstaces.memoryCost + bandwidth.cost}/month</label>
                </div>
            </div>
            <footer className="footer">
                <div className={step === 0 ? "display nav-btns" : "nav-btns"}>
                    <button className="back-btn" onClick={() => setStep(step - 1)}>Back</button>
                    <button disabled={step === pageName.length-1 ? true : false} className="proceed-btn" onClick={() => {
                        let error = false
                        if (step === 1) {
                            if (selectedInstaces.memoryValue === "" || selectedInstaces.CPUvalue === "") {
                                alert("Please select appropriate CPU and Memory values first")
                                error = true;
                            }
                        }
                        if (!error) {
                            setStep(step + 1);
                        }
                    }}>Proceed</button>
                </div>
            </footer>
        </div>
    );
}

export default Common;
