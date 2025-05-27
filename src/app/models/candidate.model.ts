import { Skill } from "./skill.model";

export interface Candidate {
    id: number;
    name: string;
    lastName: string;
    DOB: Date;
    firstLineOfAddress: string;
    addressCity: string;
    addressCountry: string;
    addressPostCode: string;
    homePhoneNo: string;
    mobilePhoneNo: string;
    workPhoneNo: string;
    dateUpdated: Date;
    dateCreated: Date;
    skills: Skill[];
}