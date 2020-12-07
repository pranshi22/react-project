import { cleanup, fireEvent, getByText, render, wait } from '@testing-library/react';
import * as React from 'react';
import DisplayArea from './DisplayArea';
import Common from './DisplayArea';

const regionList = ["US-East-1", "US-East-2", "US-West-1", "India-1"];

const pageName = [
    "Choose Image",
    "Choose Instance Type",
    "Choose Storage and Network",
    "Configure Security",
    "Review & Launch"
];

const step = [0, 1, 2, 3, 4];

const images = [
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
];

const selectedInstaces = {
    tab: "General Purpose",
    CPUvalue: "2 VCPUs",
    CPUcost: 0,
    memoryValue: "32GB",
    memoryCost: 20
}

const storageCard = {
    id: "storage1",
    type: "SSD",
    Volume: "Root",
    Capacity: 120,
    Encryption: true,
    IOPS: 600,
    BackupRequired: true,
    Remarks: ""
}

afterEach(cleanup);

describe("check if proper area is displayed based on steps", () => {

    test('check if proper page displayed', () => {
        const { } = render(<DisplayArea images={images} step={step[0]} region="region"
            regionsList={regionList} pageNameList={pageName} imageCost={images[0].cost}
            selectedInstaces={selectedInstaces} storageCard={[storageCard]} />)
    })

})