import { atomWithStorage } from "jotai/utils";
import { IUserDto } from "../types/user";

// зачем в localStorage это все хранить? а.. ну хотя, может быть и надо,
// можно убрать, но нужно на каждой странице запрашивать данные и общеее хранилище
// будет сбрасываться при перезагрузке сайта

export const userStorageAtom = atomWithStorage<IUserDto | null>("user", null);

// export const userStorageAtom = atom<IUserDto | null>(null);
