import React, { useState } from 'react';
import './InstanceType.css'

function InstanceType(props: {
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
    }>>
}) {

    const [instances, setInstances] = useState([
        {
            id: "ins1",
            tab: "General Purpose",
            memory: ["256MB", "512MB", "1GB", "2GB", "4GB"],
            cpu: ["1 vCPUs", "2 vCPUs", "4 vCPUs"],
            state: true
        },
        {
            id: "ins2",
            tab: "Compute Optimised",
            memory: ["16GB", "32GB", "64GB"],
            cpu: ["1 vCPUs", "8 vCPUs", "16 vCPUs"],
            state: false
        },
        {
            id: "ins3",
            tab: "Storage Optimised",
            memory: ["16GB", "32GB", "64GB"],
            cpu: ["1 vCPUs", "2 vCPUs", "4 vCPUs", "8 vCPUs", "16 vCPUs"],
            state: false
        },
        {
            id: "ins4",
            tab: "Network Optimised",
            memory: ["256MB", "512MB", "1GB", "2GB", "4GB", "16GB", "32GB", "64GB"],
            cpu: ["1 vCPUs", "2 vCPUs", "4 vCPUs"],
            state: false
        }
    ]);

    function updateTabstate(name: string, clearIns: boolean = false) {
        setInstances(() => {
            let instanceClone = [...instances];
            instanceClone.forEach(element => {
                element.tab === name ? element.state = true : element.state = false
            });
            return instanceClone
        })
        props.setSelectedInstaces(() => {
            let selInsClone = { ...props.selectedInstaces };
            selInsClone.tab = name;
            if(clearIns){
                selInsClone.CPUcost = 0;
                selInsClone.CPUvalue = "";
                selInsClone.memoryCost=0;
                selInsClone.memoryValue = "";
            }
            return selInsClone;
        })
    }

    function handleTabClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) {

        if (props.selectedInstaces.CPUvalue === "" && props.selectedInstaces.memoryValue === "") {
            updateTabstate(name)
        }
        else {
            instances.map(item => {
                if (item.tab === name) {
                    let cpuAvailable = item.cpu.filter(cpus => cpus === props.selectedInstaces.CPUvalue);
                    
                    let memoryAvailable = item.memory.filter(mr => mr === props.selectedInstaces.memoryValue)
                    if (cpuAvailable.length === 0 && props.selectedInstaces.CPUvalue !== "") {
                        let choice = window.confirm(props.selectedInstaces.CPUvalue + " is not available for " + name)
                        if (choice){
                            updateTabstate(name, true);
                        }
                    }
                    else if (memoryAvailable.length === 0 && props.selectedInstaces.memoryValue !== "") {
                        let choice = window.confirm(props.selectedInstaces.memoryValue + " is not available for " + name)
                        if (choice){
                            updateTabstate(name, true);
                        }
                    }
                    else {
                        updateTabstate(name);
                    }
                }
            })
        }
    }

    function cpuSelectHandler(e: any) {
        let cost = 0;
        if (e.target.value === "8 vCPUs") {
            cost = 20
        }
        else if (e.target.value === "16 vCPUs") {
            cost = 40
        }
        props.setSelectedInstaces(() => {
            let selInsClone = { ...props.selectedInstaces };
            selInsClone.CPUvalue = e.target.value;
            selInsClone.CPUcost = cost;

            return selInsClone;
        })
    }

    function memorySelectHandler(e: any) {
        let cost = 0;
        if (e.target.value === "32GB") {
            cost = 20
        }
        else if (e.target.value === "64GB") {
            cost = 40
        }
        props.setSelectedInstaces(() => {
            let selInsClone = { ...props.selectedInstaces };
            selInsClone.memoryValue = e.target.value;
            selInsClone.memoryCost = cost;

            return selInsClone;
        })
    }

    return (
        <div>
            <div className="instance-types" role="instance">
                {instances.map((instance) =>
                    <div onClick={(e) => handleTabClick(e, instance.tab)} id={instance.id} className={instance.state === true ? "ins-sel instance-tabs" : "instance-tabs"} key={instance.tab}>{instance.tab}</div>)}
            </div>
            <label className="create-config">Create Configuration</label>
            {instances.filter((item) => item.state === true).map((insItem) =>
                <div className="dd-container" key={insItem.id}>
                    <select onChange={cpuSelectHandler} key={insItem.id + "cpu"} className="select-cpu-mr" role="cpu-select" value={props.selectedInstaces.CPUvalue}>
                        <option hidden={true}>CPU Cores</option>
                        {insItem.cpu.map((cpu, index) => {
                            return <option className="option-cpu" key={index} value={cpu}>{cpu}</option>;
                        })}
                    </select>
                    <select onChange={memorySelectHandler} key={insItem.id + "mr"} className="select-cpu-mr" role="memory-select" value={props.selectedInstaces.memoryValue}>
                        <option hidden={true}>Memory</option>
                        {insItem.memory.map((memory, index) => {
                            return <option className="option-memory" key={memory} value={memory}>{memory}</option>;
                        })}
                    </select>
                </div>
            )}
        </div>
    )
}

export default InstanceType;