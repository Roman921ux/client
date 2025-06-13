import { IBookingDto } from "@/shared/model/types/booking";
import { atom } from "jotai";

export const sortbookingAtom = atom<IBookingDto[] | null | undefined>(null);
export const filterbookingAtom = atom<IBookingDto[] | null | undefined>(null);
export const isMapViewFullAtom = atom<boolean>(false);

// export const userStorageAtom = atom<IUserDto | null>(null);
