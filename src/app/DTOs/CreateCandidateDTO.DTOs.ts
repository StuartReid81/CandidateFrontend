export interface CreateCandidateDTO {
    id: number;
    name: string;
    lastName: string;
    DOB: string;
    firstLineOfAddress: string;
    addressCity: string;
    addressCountry: string;
    addressPostCode: string;
    homePhoneNo: string;
    mobilePhoneNo: string;
    workPhoneNo: string;
    formattedDOB: string;
}