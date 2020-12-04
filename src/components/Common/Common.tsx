import React, { useState } from 'react';
import './Common.css'
import Image from '../Image/Image'
import InstanceType from '../InstanceType/InstanceType'
import StorageAndNetwork from '../StorageAndNetwork/StorageAndNetwork'
import Security from '../Security/Security'
import ReviewAndLaunch from '../ReviewAndLaunch/ReviewAndLaunch'

function Common() {

    const [images, setImages] = useState([
        {
            id: "id1",
            name: "Linux 2 Image",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false
        },
        {
            id: "id2",
            name: "Ubuntu Server 18.04 LTS",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false
        },
        {
            id: "id3",
            name: "Redhat Enterprise Linux 8",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false
        },
        {
            id: "id4",
            name: "Microsoft Windows Server 2019 Base",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false
        },
        {
            id: "id5",
            name: "SUSE Linux Enterprise Server",
            desc: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            type: "86",
            state: false
        }
    ])

    const [step, setStep] = useState(0)
    const [proceedDisable, setproceedDisable] = useState(true)

    const pageName = [
        "Choose Image",
        "Choose Instance Type",
        "Choose Storage and Network",
        "Configure Security",
        "Review & Launch"
    ]

    return (
        <div className="common-module">
            <header><h1 className="header-elem" role="heading">HVC</h1></header>
            <div className="main-container">
                <div>
                    <label className="page-name">{pageName[step]}</label>
                    <div className="changing-div">
                    <div className="tab-container">
                        {pageName.map((value, index) => <div key={value} className={step === index ? "active tabs" : "tabs"}>
                            {String(index+1)+". "+value}
                        </div>
                        )}
                    </div>
                    <Image hidden={step!==0} images={images} setImages={setImages} setproceedDisable={setproceedDisable}/>
                </div>
                </div>
                
                <select name="region" id="region" className="select-region">
                    <option value="us-east-1">us-east-1</option>
                    <option value="us-east-2">us-east-2</option>
                    <option value="us-west-1">us-west-1</option>
                    <option value="india-1">india-1</option>
                </select>
                
                <div className="cost-card">
                    <label className="cost-heading">Cost Estimates</label>
                </div>
            </div>
            <footer className="footer">
                <button className="back-btn" disabled={step===0 ? true:false} onClick={() => setStep(step-1)}>Back</button>
                <button className="proceed-btn" disabled={proceedDisable} onClick={()=> setStep(step+1)}>Proceed</button>
            </footer>
        </div>
    );
}

export default Common;
