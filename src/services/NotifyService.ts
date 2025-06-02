import { Service } from "typedi";
import { SpeciesRepository } from "../repositories/SpeciesRepository";
import { Species } from "../entities/Species";
import { NotifyRepository } from "../repositories/NotifyRepository";
import { Notify } from "../entities/Notify";

@Service()
export class NotifyService {
  private notifyRepository: NotifyRepository;

  constructor() {
    this.notifyRepository = new NotifyRepository();
  }


  public async createNotify(notifyData: Partial<Notify>): Promise<Notify> {
    return this.notifyRepository.create(notifyData);
  }

  public async updateNotify(id: number, notifyData: Partial<Notify>): Promise<Notify | null> {
    return this.notifyRepository.update(id, notifyData);
  }

  public async deleteNotify(id: number): Promise<boolean> {
    return this.notifyRepository.delete(id);
  }

  public async getNotifyByUserId(userId: number): Promise<Notify[]> {
    return this.notifyRepository.findByUserId(userId);
  }


} 