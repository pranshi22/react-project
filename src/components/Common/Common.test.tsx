import { cleanup, fireEvent, getByText, render, wait } from '@testing-library/react';
import * as React from 'react';
import Common from './Common'

const regions = ["US-East-1", "US-East-2", "US-West-1", "India-1"];

const pageName = [
    "Choose Image",
    "Choose Instance Type",
    "Choose Storage and Network",
    "Configure Security",
    "Review & Launch"
];

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

afterEach(cleanup);

describe('checking functionality of common module', () => {
    
    test('check if elements are visible in DOM', () => {
        const {getByRole} = render(<Common/>);
        const mainHeading = getByRole("head");
        const pageName = getByRole("page-name-elem");
        const pageTabs = getByRole("page-tabs");
        const costBox = getByRole("cost-box");
        expect(mainHeading).toBeInTheDocument();
        expect(pageName).toBeInTheDocument();
        expect(pageTabs).toBeInTheDocument();
        expect(costBox).toBeInTheDocument();
    });

    test('check if region dropdown works fine', () => {
        const {getByRole, getByText} = render(<Common/>);
        const region = getByRole("region-select");
        fireEvent.click(region);
        regions.forEach((elem, index) => {
            expect(getByText(elem)).toBeVisible();
        });
    });

    test('Check if all the tabs present', () => {
        const {getByText} = render(<Common/>);
        pageName.forEach((item, index)=> {
            expect(getByText(String(index + 1) + ". " + item)).toBeInTheDocument();
        });
    });

    test('check if on changing region images are changed', () => {
        const {getByRole, getByText} = render(<Common/>);
        const region = getByRole("region-select");
        
        fireEvent.click(region);
        fireEvent.click(getByText(regions[0]));
        wait(() => expect(getByText(images[3].name)).toBeInTheDocument());

        fireEvent.click(region);
        fireEvent.click(getByText(regions[2]));
        expect(getByText(images[3].name)).not.toBeInTheDocument();

        
    });

});
