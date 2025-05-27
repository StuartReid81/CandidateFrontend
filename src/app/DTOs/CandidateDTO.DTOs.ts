import { CandidateSkillDTO } from "./CandidateSkillDTO.DTOs";


export interface CandidateDTO {
    id: number;
    name: string;
    lastName: string;
    DOB: string;
    formattedDOB: string;
    firstLineOfAddress: string;
    addressCity: string;
    addressCountry: string;
    addressPostCode: string;
    homePhoneNo: string;
    mobilePhoneNo: string;
    workPhoneNo: string;
    dateUpdated: Date;
    dateCreated: Date;
    formattedDateCreated: string;
    formattedDateLastUpdated: string;
    skills: CandidateSkillDTO[];
}