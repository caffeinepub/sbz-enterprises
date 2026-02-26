import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingInquiry {
    country: string;
    contactPerson: string;
    destinationPort: string;
    email: string;
    message: string;
    timestamp: Time;
    companyName: string;
    paymentTerms: string;
    phoneNumber: string;
    quantityMT: bigint;
}
export type Time = bigint;
export interface backendInterface {
    getAllInquiries(): Promise<Array<BookingInquiry>>;
    submitInquiry(companyName: string, contactPerson: string, country: string, email: string, phoneNumber: string, quantityMT: bigint, destinationPort: string, paymentTerms: string | null, message: string): Promise<void>;
}
