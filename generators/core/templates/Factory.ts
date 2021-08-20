import { IUsecase } from "./Usecase";

export type TFactory<T extends IUsecase> = () => T;
